import {Commands, WorkerCommands} from "../comands/CommandCollection";
import {CommandMessage} from "../messaging/MessageContracts";
import {WorkerCommandConstructor} from "../comands/contracts/Command";
import {Actor} from "../actors/contracts/Actor";


class WorkerSystem {

    static instance: Actor;
    static pid: number

    static start(name, count = 1) {
        process.send && process.send({command: Commands.START, name, count});
    }

    static stop(name) {
        process.send && process.send({command: Commands.STOP, name});
    }

    static send(name, data) {
        process.send && process.send({command: Commands.MESSAGE, name, data});
    }

    static ready(name) {
        console.log('worker', name);
        process.send && process.send({command: Commands.READY, name, pid: WorkerSystem.pid});
    }

    static setPid(pid) {
        WorkerSystem.pid = pid
    }
}

WorkerSystem.setPid(process.pid);

process.on('SIGINT', () => {
});

process.on('message', (message: CommandMessage) => {
    console.log(message, 'Worker');
    const Command = WorkerCommands.get(message.command) as WorkerCommandConstructor | undefined;
    if (Command) {
        const command = new Command(WorkerSystem, message);
        command.execute();
    }
});

export default WorkerSystem;
