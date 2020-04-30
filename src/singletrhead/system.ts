import { ActorConstructor, Actors } from '../actors/contracts/Actor';
import { SystemControlProps } from '../systems/contracts/SystemControlProps';
import ActorCollection from '../actors/ActorCollection';
import { EmailMessage, RenderMessage } from '../messaging/MessageContracts';


class MasterSystem {

    private static actors = new Map<Actors, SystemControlProps>()

    static register(name: Actors) {
      const actor = MasterSystem.actors.get(name);

      if (!actor) {
        const ready = [];
        const instances = [];
        const queue = [];
        MasterSystem.actors.set(name, { ready, instances, queue });
        return MasterSystem.actors.get(name);
      }
      return actor;
    }

    static start(name: Actors, count = 1) {
      const record = this.register(name);

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

    static async send(name: Actors, message?: EmailMessage | RenderMessage) {
      const record = MasterSystem.actors.get(name);
      if (record) {
        const { ready, queue } = record;
        const actor = ready.shift();
        if (!actor) {
          queue.push(message);
          return;
        }
        await actor.message(message);
        ready.push(actor);
        if (queue.length > 0) {
          const next = queue.shift();
          this.send(name, next);
        }
      }
    }
}

export default MasterSystem;
