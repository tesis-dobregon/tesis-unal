import { hashSync, compare } from 'bcryptjs';
import { Context, Errors, ServiceSchema } from 'moleculer';
import { createDbServiceMixin } from '../mixins/db.mixin';
import { sign } from 'jsonwebtoken';
import { DbAdapter, DbServiceSettings, MoleculerDbMethods } from 'moleculer-db';
import MongoDbAdapter from 'moleculer-db-adapter-mongo';

export interface UserEntity {
  _id: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  image: string | null;
  createdAt: Date;
  token?: string;
}

interface UsersSettings extends DbServiceSettings {
  defaultName: string;
  JWT_SECRET: string;
  fields: string[];
  entityValidator: Record<string, any>;
}

interface UsersThis extends ServiceSchema<UsersSettings>, MoleculerDbMethods {
  adapter: DbAdapter | MongoDbAdapter;
}

const UserService: ServiceSchema<UsersSettings> = {
  name: 'users',

  /**
   * Settings
   */
  settings: {
    defaultName: 'Moleculer',
    /** Secret for JWT */
    JWT_SECRET: process.env.JWT_SECRET || 'jwt-unal-secret',

    /** Public fields */
    fields: ['_id', 'username', 'email', 'bio', 'image'],

    /** Validator schema for entity */
    entityValidator: {
      username: { type: 'string', min: 2, pattern: /^[a-zA-Z0-9]+$/ },
      password: { type: 'string', min: 6 },
      email: { type: 'email' },
      bio: { type: 'string', optional: true },
      image: { type: 'string', optional: true },
    },
  },

  /**
   * Mixins
   */
  mixins: [createDbServiceMixin('users')],

  /**
   * Dependencies
   */
  dependencies: [],
  /**
   * Actions
   */
  actions: {
    /**
     * Register a new user
     *
     * @actions
     * @param {Object} user - User entity
     *
     * @returns {Object} Created entity & token
     */
    create: {
      rest: 'POST /',
      params: {
        user: {
          type: 'object',
          props: {
            username: { type: 'string', min: 2, pattern: /^[a-zA-Z0-9]+$/ },
            password: { type: 'string', min: 6 },
            email: { type: 'email' },
            bio: { type: 'string', optional: true },
            image: { type: 'string', optional: true },
          },
        },
      },
      async handler(
        this: UsersThis,
        ctx: Context<{ user: UserEntity }, { token?: string }>
      ) {
        this.logger.info('Creating a new user', ctx.params.user);

        const entity = ctx.params.user;

        await this.validateEntity(entity);

        if (entity.username) {
          const found = await this.adapter.findOne({
            username: entity.username,
          });
          if (found) {
            throw new Errors.MoleculerClientError(
              'Username is exist!',
              422,
              '',
              [{ field: 'username', message: 'is exist' }]
            );
          }
        }

        if (entity.email) {
          const found = await this.adapter.findOne({ email: entity.email });
          if (found) {
            throw new Errors.MoleculerClientError('Email is exist!', 422, '', [
              { field: 'email', message: 'is exist' },
            ]);
          }
        }

        entity.password = hashSync(entity.password, 10);
        entity.bio = entity.bio || '';
        entity.image = entity.image || null;
        entity.createdAt = new Date();

        const doc = await this.adapter.insert(entity);
        const user = await this.transformDocuments(ctx, {}, doc);
        const transformedUser = await this.transformEntity(
          user,
          true,
          ctx.meta.token
        );

        // Clear the cache & call entity lifecycle events
        await this.entityChanged('created', transformedUser, ctx);

        return transformedUser;
      },
    },
    /**
     * Login with username & password
     * @actions
     * @param {String} email
     * @param {String} password
     * @returns {Object} Logged in user with token
     */
    login: {
      rest: 'POST /login',
      params: {
        email: { type: 'email' },
        password: { type: 'string', min: 1 },
      },
      async handler(
        this: UsersThis,
        ctx: Context<{ email: string; password: string }, { token?: string }>
      ) {
        const { email, password } = ctx.params;

        const user = (await this.adapter.findOne({ email })) as UserEntity;
        if (!user) {
          throw new Errors.MoleculerClientError('Email not found!', 422, '', [
            { field: 'email', message: 'not found' },
          ]);
        }

        const match = await compare(password, hashSync(password, 10));

        if (!match) {
          throw new Errors.MoleculerClientError('Wrong password!', 422, '', [
            { field: 'password', message: 'is incorrect' },
          ]);
        }

        const transformedUser = await this.transformEntity(
          user,
          true,
          ctx.meta.token
        );

        return transformedUser;
      },
    },
  },

  /**
   * Methods
   */
  methods: {
    /**
     * Generate a JWT token from user entity
     *
     * @param {Object} user
     */
    generateJWT(user: UserEntity) {
      const today = new Date();
      const exp = new Date(today);
      exp.setDate(today.getDate() + 60);

      return sign(
        {
          id: user._id,
          username: user.username,
          exp: Math.floor(exp.getTime() / 1000),
        },
        this.settings.JWT_SECRET
      );
    },
    /**
     * Transform returned user entity. Generate JWT token if neccessary.
     *
     * @param {Object} user
     * @param {Boolean} withToken
     * @param {String} token
     */
    transformEntity(user: UserEntity, withToken: boolean, token: string) {
      if (user) {
        //user.image = user.image || "https://www.gravatar.com/avatar/" + crypto.createHash("md5").update(user.email).digest("hex") + "?d=robohash";
        user.image = user.image || '';
        if (withToken) {
          user.token = token || this.generateJWT(user);
        }
      }

      return { user: { ...user, password: undefined } };
    },
  },
};

export default UserService;
