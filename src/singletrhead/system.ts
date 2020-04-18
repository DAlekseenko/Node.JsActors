import {
  Actors, EmailMessage, RenderMessage, IActor, IActorObject
} from '../actors/IActor';
import {IActorControl} from '../actors/IActorSystem';


class ActorSystem {

    private static actors = new Map<string, IActorControl>()

    static register(actor: IActor) {
      const instances = [];
      const queue = [];
      const ready = [];
      const c = actor.constructor;

      ActorSystem.actors.set(c.name, { actor: c, ready, instances, queue });
    }

    static start(name: Actors, count = 1) {

      const record = ActorSystem.actors.get(name);
      if (record) {
        const ActorClass = record.actor as IActorObject;
        const { instances, ready } = record;
        for (let i = 0; i < count; i++) {
          const instance = new ActorClass(this);
          instances.push(instance);
          ready.push(instance);
        }
      }
    }

    static async stop(name: Actors) {
      const record = ActorSystem.actors.get(name);
      if (record) {
        const { instances } = record;
        await Promise.all(instances.map(instance => instance.exit()));
      }
    }

    static async send(name: Actors, message?: EmailMessage | RenderMessage) {
      const record = ActorSystem.actors.get(name);
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

export default ActorSystem;
