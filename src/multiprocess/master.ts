import {ChildProcess, fork} from 'child_process';
import {Commands, MasterCommands} from "../comands/CommandCollection";
import {SystemControlProps} from "../systems/contracts/SystemControlProps";
import {MasterCommandConstructor} from "../comands/contracts/Command";
import {Actors} from "../actors/contracts/Actor";

class MasterSystem {

    static workers = new Map<Actors, SystemControlProps<ChildProcess>>()

    static start(name, count = 1) {
        if (!MasterSystem.workers.has(name)) {
            const ready = [];
            const instances = [];
            const queue = [];
            MasterSystem.workers.set(name, {ready, instances, queue});
        }
        const actor = MasterSystem.workers.get(name);
        if (actor) {
            const {ready, instances} = actor;
            for (let i = 0; i < count; i++) {
                const worker = fork(
                    './src/multiprocess/system.ts',
                    [],
                    {
                        execArgv: ["-r", "ts-node/register"]
                    }
                );

                MasterSystem.subscribe(worker);

                ready.push(worker);
                instances.push(worker);

                worker.send({command: Commands.START, name});
            }
        }
    }

    static stop(name) {
        const record = MasterSystem.workers.get(name);
        if (record) {
            const {instances} = record;
            for (const worker of instances) {
                worker.send({command: Commands.STOP});
            }
        }
    }

    static send(name, data) {
        const record = MasterSystem.workers.get(name);
        if (record) {
            const {ready, queue} = record;
            const worker = ready.shift();
            if (!worker) {
                queue.push(data);
                return;
            }

            worker.send({command: Commands.MESSAGE, data});
        }
    }

    static subscribe(worker) {
        worker.on('message', MasterSystem.messageHandler)
    }

    static messageHandler(message) {
        console.log('master', message);
        const Command = MasterCommands.get(message.command) as MasterCommandConstructor | undefined;
        if (Command) {
            const instance = new Command(MasterSystem, message);
            instance.execute();
        }
    }
}

export default MasterSystem;
