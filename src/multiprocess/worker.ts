import {CommandMessage, IActor, IActorObject} from "../actors/IActor";
import  {ActorsCommands, Commands} from "../comands/CommandCollection";
import {IActorCommandConstructor} from "../comands/IActorCommand";


class ActorSystem {

    static actor: IActorObject;
    static instance: IActor;
    static pid: number

    static register(actor) {
        this.actor = actor;
    }

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
        console.log(this.pid);
        process.send && process.send({command: Commands.READY, name, pid: ActorSystem.pid});
    }

    static setPid(pid) {
        ActorSystem.pid = pid
        this.pid = pid
    }
}

ActorSystem.setPid(process.pid);

process.on('SIGINT', () => {
});

process.on('message', (message:CommandMessage) => {
    const Command = ActorsCommands.get(message.command) as IActorCommandConstructor | undefined;
    if (Command) {
        const instance = new Command(ActorSystem, message);
        instance.execute();
    }
});

export default ActorSystem;
