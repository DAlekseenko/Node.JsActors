import { Worker, WorkerOptions } from 'worker_threads';
import { Actors } from '../actors/contracts/Actor';

import { SystemControlProps } from '../systems/contracts/SystemControlProps';
import { Commands, MasterCommands } from '../comands/CommandCollection';
import { MasterCommandConstructor } from '../comands/contracts/Command';
import { WorkerThread } from '../systems/contracts/MasterSystem';

class MasterSystem {

    static workers = new Map<Actors, SystemControlProps<WorkerThread>>()

    static register(name: Actors) {
      const worker = MasterSystem.workers.get(name);
      if (!worker) {
        const ready = [];
        const instances = [];
        const queue = [];
        return MasterSystem.workers
          .set(name, { ready, instances, queue })
          .get(name);

      }
      return worker;
    }

    static workerTs(file: string, wkOpts: WorkerOptions = {}) {

      wkOpts.eval = true;

      if (!wkOpts.workerData) {
        wkOpts.workerData = {};
      }

      wkOpts.workerData.__filename = file;

      return new Worker(`
            const wk = require('worker_threads');
            require('ts-node').register();
            let file = wk.workerData.__filename;
            delete wk.workerData.__filename;
            require(file);
        `,
      wkOpts
      );
    }

    static start(name: Actors, count = 1) {
      console.log('here');
      const record = MasterSystem.register(name);
      if (record) {
        const { ready, instances } = record;
        for (let i = 0; i < count; i++) {

          // @ts-ignore
          const worker = this.workerTs(__dirname + '/system.ts', {});

          MasterSystem.subscribe(worker);

          ready.push(worker);
          instances.push(worker);

          worker.postMessage({ command: Commands.START, name });
        }
      }
    }

    static stop(name) {
      const record = MasterSystem.workers.get(name);
      if (record) {
        const { instances } = record;
        for (const worker of instances) {
          worker.postMessage({ command: 'stop' });
        }
      }
    }

    static send(name, data) {
      const record = MasterSystem.workers.get(name);
      if (record) {
        const { ready, queue } = record;
        const actor = ready.shift();
        if (!actor) {
          queue.push(data);
          return;
        }
        actor.postMessage({ command: 'message', data });
      }
    }

    static subscribe(worker) {
      worker.on('message', MasterSystem.messageHandler);
    }

    static messageHandler(message) {
      const Command = MasterCommands
        .get(message.command) as MasterCommandConstructor<WorkerThread> | undefined;
      if (Command) {
        const instance = new Command(MasterSystem, message);
        instance.execute();
      }
    }
}

export default MasterSystem;
