import { ActorConstructor, Actors } from '../actors/contracts/Actor';
import { SystemControlProps } from '../systems/contracts/SystemControlProps';
import ActorCollection from '../actors/ActorCollection';
import { EmailMessage, RenderMessage } from '../messaging/MessageContracts';
import Queue from '../queue/Queue';

class MasterSystem {

    private static actors = new Map<Actors, SystemControlProps>()

    static register(name: Actors, count: number) {
      const actor = MasterSystem.actors.get(name);

      if (!actor) {
        const ready = [];
        const instances = [];
        const queue = Queue
          .channels(count * 5)
          .timeout(3000)
          .process((task, next) => {
            const { timeout } = task;
            setTimeout(() => {
              next(null, task);
            }, timeout);
          })
          .failure(err => console.log({ err }))
          .success((err, task) => {
            const { name, message, timeout } = task;
            this.send(name, message, timeout * 2);
          });
        return MasterSystem.actors.set(name, { ready, instances, queue }).get(name);
      }
      return actor;
    }

    static start(name: Actors, count = 1) {
      const record = this.register(name, count);

      if (record) {
        const ActorClass = ActorCollection.get(name) as ActorConstructor;
        const { instances, ready } = record;
        for (let i = 0; i < count; i++) {
          const instance = new ActorClass(this);
          instances.push(instance);
          ready.push(instance);
        }
      }
    }

    static async stop(name: Actors) {
      const record = MasterSystem.actors.get(name);
      if (record) {
        const { instances } = record;
        await Promise.all(instances.map(instance => instance.exit()));
      }
    }

    static async send(name: Actors, message?: EmailMessage | RenderMessage, timeout: number = 300) {
      const record = MasterSystem.actors.get(name);
      if (record) {
        const { ready, queue } = record;
        const actor = ready.shift();
        if (!actor) {
          queue.add({ name, message, timeout });
          return;
        }
        await actor.message(message);
        ready.push(actor);
      }
    }
}

export default MasterSystem;
