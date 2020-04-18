import AbstractCommand from "./AbstractCommand";
import ActorsCollection from "../actors/ActorCollection";
import {IActorObject} from "../actors/IActor";

class ActorStartCommand extends AbstractCommand {
    execute() {
        const {name = ''} = this.message;
        const ActorClass = ActorsCollection.get(name) as IActorObject;
        this.system.instance = new ActorClass(this.system);
    }
}

export default ActorStartCommand;
