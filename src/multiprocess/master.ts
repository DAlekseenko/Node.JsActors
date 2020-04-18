import {fork} from 'child_process';
import {IActorControl, IActorMultiSystemMaster} from "../actors/IActorSystem";
import {ActorsCommands, Commands, MasterCommands} from "../comands/CommandCollection";
import {IActorCommandConstructor} from "../comands/IActorCommand";
import ActorSystem from "./worker";

class MasterSystem {

    private static actors = new Map<string, IActorControl<IActorMultiSystemMaster>>()

    static start(name, count = 1) {
        if (!MasterSystem.actors.has(name)) {
            const ready = [];
            const instances = [];
            const queue = [];
            MasterSystem.actors.set(name, {ready, instances, queue});
        }
        const actor = MasterSystem.actors.get(name);
        if (actor) {
            const {ready, instances} = actor;
            for (let i = 0; i < count; i++) {
                const actor = fork('./system.js');
                MasterSystem.subscribe(actor);
                ready.push(actor);
                instances.push(actor);
                actor.send({command: Commands.START, name});
            }
        }
    }

    static stop(name) {
        const record = MasterSystem.actors.get(name);
        if (record) {
            const {instances} = record;
            for (const actor of instances) {
                actor.send({command: Commands.STOP});
            }
        }
    }

    static send(name, data) {
        const record = MasterSystem.actors.get(name);
        if (record) {
            const {ready, queue} = record;
            const actor = ready.shift();
            if (!actor) {
                queue.push(data);
                return;
            }
            actor.send({command: Commands.MESSAGE, data});
        }
    }

    static subscribe(actor) {
        actor.on('message', MasterSystem.subscribeHandler)
    }

    static subscribeHandler(message) {
        const Command = MasterCommands.get(message.command) as IActorCommandConstructor | undefined;
        if (Command) {
            const instance = new Command(ActorSystem, message);
            instance.execute();
        }
    }
}

export default MasterSystem;
