import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { Context, Errors, ServiceSchema } from 'moleculer';
import type { GatewayResponse, IncomingRequest, Route } from 'moleculer-web';
import OAuth2Server from 'oauth2-server';
import MongoOAuth2 from '../lib/oauth2';
import { UserEntity } from '../services/users.service';

const secretKey = process.env.JWT_SECRET || 'jwt-unal-secret';
const { Request, Response } = OAuth2Server;
interface Meta {
  userAgent?: string | null | undefined;
  user?: object | null | undefined;
}

export type OAuth2Methods = {
  accessToken: (req: any, res: any, next: any) => Promise<any>;
  authenticate: (req: any, res: any) => Promise<any>;
  authorize: (ctx: any, route: any, req: any, res: any) => Promise<any>;
  token: (req: any, res: any, next: any) => Promise<any>;
  getAccessToken: (accessToken: string) => Promise<any>;
  getClient: (clientId: string, clientSecret: string) => Promise<any>;
  getUser: (username: string, password: string) => Promise<any>;
  saveToken: (token: any, client: any, user: any) => Promise<any>;
  verifyScope: (token: any, scope: any) => Promise<any>;
  getAuthorizationCode: (authorizationCode: string) => Promise<any>;
};

export type Oauth2ServiceSchema = Partial<ServiceSchema> &
  Partial<OAuth2Methods>;

export type OAuth2This = Oauth2ServiceSchema & OAuth2Methods;

export default function createOauth2ServiceMixin(): Oauth2ServiceSchema {
  const schema: Oauth2ServiceSchema = {
    settings: {
      allowBearerTokensInQueryString: true,
      accessTokenLifetime: 24 * 60 * 60, // 24hrs
      grants: ['refresh_token', 'client_credentials', 'password'],
    },
    methods: {
      accessToken(req: any, res: any, next: any) {
        const request = new Request(req);
        const response = new Response(res);
        this.logger.info('Access Token');
        try {
          return this.oauth.token(request, response).then((_token: any) => {
            response.headers = {
              ...response.headers,
              'Content-Type': 'application/json charset=utf-8',
            };
            for (const h in response.headers)
              res.setHeader(h, response.headers[h]);
            res.writeHead(response.status);
            res.end(JSON.stringify(response.body));
          });
        } catch (err) {
          next(err);
        }
      },
      authenticate(
        _ctx: Context<null, Meta>,
        _route: Route,
        req: IncomingRequest,
        res: GatewayResponse,
        next: any
      ) {
        this.logger.info('mixins.oauth2.authenticate');
        const request = new Request(req);
        const response = new Response(res);
        try {
          return this.oauth
            .authenticate(request, response)
            .then((token: any) => {
              // this.logger.info('Authenticating', token)
              // resp(res, response.body, response.status, response.headers);
              return token;
            });
        } catch (err) {
          this.logger.error('Authenticating error', err);
          return next(err);
        }
      },
      async authorize(
        _ctx: Context<null, Meta>,
        _route: Route,
        req: IncomingRequest,
        res: GatewayResponse,
        _next: any
      ) {
        this.logger.info('AUTHORIZE');
        const request = new Request(req);
        const response = new Response(res);
        try {
          return this.oauth.authorize(request, response).then((token: any) => {
            this.logger.info('Authorizing', token);
            // resp(res, response.body, response.status, response.headers);
            return token;
          });
        } catch (err) {
          this.logger.error('Authorizing error', err);
          // resp(res, response.body, response.status, response.headers);
        }
      },
      async getAccessToken(token: string) {
        try {
          const payload = verify(token, secretKey) as any;
          // Fetch user and client from the database if needed
          return {
            accessToken: token,
            client: { id: payload.clientId },
            user: { id: payload.userId },
            accessTokenExpiresAt: new Date(Date.now() + 3600000),
          };
        } catch (error) {
          return false;
        }
      },
      async getClient(clientId: string, clientSecret: string) {
        const client = await this.db.client.findOne({ clientId });
        if (!client) return null;

        // If a secret is provided, validate it (only for confidential clients)
        if (clientSecret && client.clientSecret !== clientSecret) {
          return null;
        }

        return {
          id: client._id,
          clientId: client.clientId,
          grants: ['client_credentials'], // Specify the allowed grants for this client
        };
      },
      async getUser(username: string, password: string) {
        const user = (await this.db.user.findOne({ username })) as UserEntity;
        if (!user) {
          throw new Errors.MoleculerClientError('Email not found!', 422, '', [
            { field: 'email', message: 'not found' },
          ]);
        }

        const match = await compare(password, user.password);

        if (!match) {
          throw new Errors.MoleculerClientError('Wrong password!', 422, '', [
            { field: 'password', message: 'is incorrect' },
          ]);
        }

        return user;
      },
      revokeToken(token) {
        return this.db.refreshToken
          .findOneAndRemove({ refreshToken: token.refreshToken })
          .then((removed: any) => !!removed)
          .catch((err: any) =>
            this.logger.error('[oAuth2Server] revokeToken:', err)
          );
      },
      async saveToken(token, client, user) {
        try {
          // Create a JWT as the access token
          const jwtAccessToken = sign(
            { clientId: client._id, scope: token.scope },
            secretKey,
            { expiresIn: '24h' }
          );

          await Promise.all([
            this.db.token.create({
              accessToken: jwtAccessToken,
              accessTokenExpiresAt: token.accessTokenExpiresAt,
              client: client._id,
              user: user ? user._id : null, // In client credentials flow, the user will be null
              scope: token.scope,
            }),
            token.refreshToken
              ? this.db.refreshToken.create({
                  refreshToken: token.refreshToken,
                  refreshTokenExpiresAt: token.refreshTokenExpiresAt,
                  client: client._id,
                  user: user ? user._id : null, // In client credentials flow, the user will be null
                  scope: token.scope,
                })
              : Promise.resolve(),
          ]);

          // Return the token response object, replacing the access token with the JWT
          return {
            accessToken: jwtAccessToken, // The signed JWT
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            refreshToken: token.refreshToken, // Keep the refresh token unchanged
            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
            client,
            user, // user will be null in client credentials flow
          };
        } catch (err) {
          this.logger.error('[oAuth2Server] saveToken:', err);
          throw err;
        }
      },
      getRefreshToken(refreshToken) {
        return this.db.refreshToken
          .findOne({ refreshToken })
          .populate('user')
          .populate('client')
          .lean()
          .then((dbToken: any) => {
            if (!dbToken) return false;

            const extendedClient = Object.assign(dbToken.client, {
              id: dbToken.client.clientId,
            });

            return Object.assign(dbToken, { client: extendedClient });
          })
          .catch((err: any) =>
            this.logger.error('[oAuth2Server] getRefreshToken:', err)
          );
      },
      validateScope(user, client, scope) {
        if (!scope) return true;

        if (
          String(user.scope)
            .split(',')
            .some((i) => i === scope) &&
          String(client.scope)
            .split(', ')
            .some((i) => i === scope)
        ) {
          return scope;
        }
      },
      getUserFromClient(client) {
        return this.db.user
          .findOne(client.user)
          .lean()
          .then((dbUser: any) => dbUser)
          .catch((err: any) =>
            this.logger.error('[oAuth2Server] getUserFromClient:', err)
          );
      },
      getAuthorizationCode(authorizationCode) {
        return this.db.authorizationCode
          .findOne({ code: authorizationCode })
          .populate('user')
          .populate('client')
          .lean()
          .then((authCodeModel: any) => {
            if (!authCodeModel) return false;

            const extendedClient = Object.assign(authCodeModel.client, {
              id: authCodeModel.client.clientId,
            });

            return Object.assign(authCodeModel, {
              client: extendedClient,
            });
          })
          .catch((err: any) =>
            this.logger.error('[oAuth2Server] getAuthorizationCode:', err)
          );
      },
      saveAuthorizationCode(code, client, user) {
        return this.db.authorizationCode
          .create({
            expiresAt: code.expiresAt,
            client: client._id,
            code: code.authorizationCode,
            user: user._id,
            scope: code.scope,
          })
          .then(() => ({
            authorizationCode: code.authorizationCode,
            authorization_code: code.authorizationCode,
            // expires_in: Math.floor(( code.expiresAt - new Date()) / 1000),
          }))
          .catch((err: any) =>
            this.logger.error('[oAuth2Server] saveAuthorizationCode:', err)
          );
      },
      revokeAuthorizationCode(code) {
        return this.db.authAuthorizationCode
          .findOneAndRemove({ code: code.code })
          .then((removed: any) => !!removed)
          .catch((err: any) =>
            this.logger.error('[oAuth2Server] revokeAuthorizationCode:', err)
          );
      },
      verifyScope(token, scope) {
        return token.scope === scope;
      },
    },
    async created() {
      this.logger.debug('Oauth2 service connected to db');

      const { connection, db } = await MongoOAuth2(
        `${process.env.MONGO_URI}/oauth2`
      );
      this.connection = connection;
      this.db = db;
      this.logger.info('[oAuth2Server] Server has created successfully.');
    },

    async started() {
      this.logger.info('Oauth2 service started');
      this.oauth = new OAuth2Server({
        model: {
          getAccessToken: this.getAccessToken as any,
          getClient: this.getClient as any,
          getUser: this.getUser as any,
          saveToken: this.saveToken as any,
          verifyScope: this.verifyScope as any,
          getAuthorizationCode: this.getAuthorizationCode as any,
          saveAuthorizationCode: this.saveAuthorizationCode as any,
          revokeAuthorizationCode: this.revokeAuthorizationCode as any,
          getRefreshToken: this.getRefreshToken as any,
          revokeToken: this.revokeToken as any,
          validateScope: this.validateScope as any,
          getUserFromClient: this.getUserFromClient as any,
        },
      });
      this.logger.info('Oauth2 server created');
    },
  };
  return schema;
}
