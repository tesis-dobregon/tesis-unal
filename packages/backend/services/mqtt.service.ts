import { Service, ServiceBroker } from 'moleculer';
import * as SocketIOService from 'moleculer-io';

export default class MqttService extends Service {
  public constructor(broker: ServiceBroker) {
    super(broker);
    this.parseServiceSchema({
      name: 'socket',
      mixins: [SocketIOService],
      // More info about settings: https://github.com/tiaod/moleculer-io
      settings: {
        io: {
          // options: {
          //adapter: RedisAdapter("redis://localhost:6379")
          // adapter: AmqpAdapter('amqp://root:@uc898911@115.85.180.58:5672'),
          // },
          namespaces: {
            '/': {
              adapters: {
                mqtt: {
                  type: 'mqtt',
                  options: {
                    url: 'mqtt://localhost:1883',
                  },
                },
              },
              events: {
                'sensor.data': {
                  handler: async (packet: any) => {
                    await this.broker.call('sensor.processData', packet);
                  },
                },
              },
            },
          },
          // namespaces: {
          //   '/': {
          //     authorization: true,
          //     middlewares: [],
          //     packetMiddlewares: [],
          //     events: {
          //       call: {
          //         mappingPolicy: 'all',
          //         aliases: {
          //           join: 'message.join',
          //           leave: 'message.leave',
          //           chat: 'message.chat',
          //         },
          //         whitelist: ['**'],
          //         callOptions: {},
          //         onBeforeCall: async function(
          //           ctx: any,
          //           socket: any,
          //           args: any
          //         ) {
          //           ctx.meta.socket = socket;
          //         },
          //         onAfterCall: async function(
          //           ctx: any,
          //           socket: any,
          //           data: any
          //         ) { },
          //       },
          //       call02: {
          //         mappingPolicy: 'all',
          //         aliases: {
          //           hello: 'greeter.hello',
          //         },
          //         whitelist: ['**'],
          //       },
          //     },
          //   },
          // },
        },
      },

      created() {
        this.logger.info('MQTT Service created');
      },
    });
  }
}
