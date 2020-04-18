import AbstractCommand from "./AbstractCommand";
import {Actors} from "../actors/IActor";

class ActorMessageCommand extends AbstractCommand {
    execute() {
        const {instance} = this.system;
        if (instance) {
            const {data} = this.message;
            //  const {name} = this.system.actor.constructor;

            const {name} = instance.constructor;
            console.log({name}, 'ActorStartCommand');

            instance.message(data);
            this.system.ready(name as Actors);
        }
    }
}

export default ActorMessageCommand;
