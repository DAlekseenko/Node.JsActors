import { ChildProcess, fork } from 'child_process';
import { Commands, MasterCommands } from '../comands/CommandCollection';
import { SystemControlProps } from '../systems/contracts/SystemControlProps';
import { MasterCommandConstructor } from '../comands/contracts/Command';
import { Actors } from '../actors/contracts/Actor';

class MasterSystem {

    static workers = new Map<Actors, SystemControlProps<ChildProcess>>()

    static register(name: Actors) {
      const worker = MasterSystem.workers.get(name);
      if (!worker) {
        const ready = [];
        const instances = [];
        const queue = [];
        MasterSystem.workers.set(name, { ready, instances, queue });
        return MasterSystem.workers.get(name);
      }
      return worker;
    }

    static start(name: Actors, count = 1) {

      const record = MasterSystem.register(name);

      if (record) {
        const { ready, instances } = record;
        for (let i = 0; i < count; i++) {
          const worker = fork(
            './src/multiprocess/system.ts',
            [],
            {
              execArgv: ['-r', 'ts-node/register']
            }
          );

          MasterSystem.subscribe(worker);

          ready.push(worker);
          instances.push(worker);

          worker.send({ command: Commands.START, name });
        }
      }
    }

    static stop(name: Actors) {
      const record = MasterSystem.workers.get(name);
      if (record) {
        const { instances } = record;
        for (const worker of instances) {
          worker.send({ command: Commands.STOP });
        }
      }
    }

    static send(name: Actors, data) {
      const record = MasterSystem.workers.get(name);
      if (record) {
        const { ready, queue } = record;
        const worker = ready.shift();

        if (!worker) {
          queue.push(data);
          return;
        }

        worker.send({ command: Commands.MESSAGE, data });
      }
    }

    static subscribe(worker) {
      worker.on('message', MasterSystem.messageHandler);
    }

    static messageHandler(message) {
      const Command = MasterCommands
        .get(message.command) as MasterCommandConstructor<ChildProcess> | undefined;
      if (Command) {
        const instance = new Command(MasterSystem, message);
        instance.execute();
      }
    }
}

export default MasterSystem;
