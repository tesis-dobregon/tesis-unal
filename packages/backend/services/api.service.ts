import type { Context, ServiceSchema } from 'moleculer';
import type {
  ApiSettingsSchema,
  GatewayResponse,
  IncomingRequest,
  Route,
} from 'moleculer-web';
import ApiGateway from 'moleculer-web';
import OAuth2Server from '../mixins/oauth2.mixin';

const ApiService: ServiceSchema<ApiSettingsSchema> = {
  name: 'api',
  mixins: [ApiGateway, OAuth2Server()],

  // More info about settings: https://moleculer.services/docs/0.14/moleculer-web.html
  settings: {
    // Exposed port
    port: process.env.PORT != null ? Number(process.env.PORT) : 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'jwt-unal-secret',

    // Exposed IP
    ip: '0.0.0.0',

    // Global Express middlewares. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Middlewares
    use: [],

    cors: {
      origin: '*',
      methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: [
        'Access-Control-Allow-Origin',
        'Authorization',
        'Content-Type',
      ],
      exposedHeaders: [
        'Access-Control-Allow-Origin',
        'Authorization',
        'Content-Type',
      ],
      credentials: false,
      maxAge: 3600,
    },

    routes: [
      {
        path: '/api',

        whitelist: ['**'],

        // Route-level Express middlewares. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Middlewares
        use: [],

        // Enable/disable parameter merging method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Disable-merging
        mergeParams: true,

        // Enable authentication. Implement the logic into `authenticate` method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Authentication
        authentication: true,

        // Enable authorization. Implement the logic into `authorize` method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Authorization
        authorization: false,

        // The auto-alias feature allows you to declare your route alias directly in your services.
        // The gateway will dynamically build the full routes from service schema.
        autoAliases: true,

        aliases: {
          'GET /': async function (
            this: ServiceSchema,
            _req: IncomingRequest & { body: any },
            res: GatewayResponse
          ) {
            try {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ msg: 'Welcome to the API' }));
            } catch (error: any) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: error.message }));
            }
          },
        },

        /**
         * Before call hook. You can check the request.
         *
        onBeforeCall(
          ctx: Context<unknown, Meta>,
          route: Route,
          req: IncomingRequest,
          res: GatewayResponse,
        ): void {
          // Set request headers to context meta
          ctx.meta.userAgent = req.headers["user-agent"];
        }, */

        /**
         * After call hook. You can modify the data.
         *
        onAfterCall(
          ctx: Context,
          route: Route,
          req: IncomingRequest,
          res: GatewayResponse,
          data: unknown,
        ): unknown {
          // Async function which return with Promise
          // return this.doSomething(ctx, res, data);
          return data;
        }, */

        // Calling options. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Calling-options
        callOptions: {},

        bodyParsers: {
          json: {
            strict: false,
            limit: '1MB',
          },
          urlencoded: {
            extended: true,
            limit: '1MB',
          },
        },

        // Mapping policy setting. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Mapping-policy
        mappingPolicy: 'all', // Available values: "all", "restrict"

        // Enable/disable logging
        logging: true,
      },
      // Oauth routes
      {
        path: '/oauth',
        whitelist: ['**'],
        authentication: false,
        authorization: false,
        autoAliases: false,
        aliases: {},
      },
      {
        path: '/oauth/token',
        aliases: {
          'POST /': function token(
            this: ServiceSchema,
            req: IncomingRequest,
            res: GatewayResponse,
            next: any
          ) {
            return this.accessToken(req, res, next);
          },
        },
        bodyParsers: {
          json: true,
          urlencoded: {
            extended: true,
          },
        },
      },
      {
        path: '/oauth/authorize',
        aliases: {
          'POST /': function auth(
            this: ServiceSchema,
            req: IncomingRequest,
            res: GatewayResponse,
            next: any
          ) {
            return this.authenticate(req, res, next);
          },
        },
        bodyParsers: {
          json: true,
          urlencoded: {
            extended: true,
          },
        },
      },
    ],

    // Do not log client side errors (does not log an error response when the error.code is 400<=X<500)
    log4XXResponses: false,
    // Logging the request parameters. Set to any log level to enable it. E.g. "info"
    logRequestParams: null,
    // Logging the response data. Set to any log level to enable it. E.g. "info"
    logResponseData: null,

    // Serve assets from "public" folder. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Serve-static-files
    assets: {
      folder: 'public',

      // Options to `server-static` module
      options: {},
    },
  },

  methods: {
    /**
     * Authenticate the request. It check the `Authorization` token value in the request header.
     * Check the token value & resolve the user by the token.
     * The resolved user will be available in `ctx.meta.user`
     *
     * PLEASE NOTE, IT'S JUST AN EXAMPLE IMPLEMENTATION. DO NOT USE IN PRODUCTION!
     */
    async authenticate(ctx: Context, route: Route, req: IncomingRequest) {
      const {
        headers: { authorization },
      } = req;

      if (authorization) {
        if (!authorization.includes('Bearer')) {
          throw new ApiGateway.Errors.UnAuthorizedError(
            ApiGateway.Errors.ERR_NO_TOKEN,
            null
          );
        }

        try {
          const token = await req.$ctx.call('users.resolveToken', {
            token: authorization.split(' ')[1],
          });
          if (!token) {
            throw new ApiGateway.Errors.UnAuthorizedError(
              ApiGateway.Errors.ERR_INVALID_TOKEN,
              null
            );
          }
          req.$ctx.meta = { user: token };
        } catch (err) {
          throw new ApiGateway.Errors.UnAuthorizedError(
            ApiGateway.Errors.ERR_INVALID_TOKEN,
            null
          );
        }
      }
    },
  },
};

export default ApiService;
