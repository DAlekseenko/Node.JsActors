import {CommandMessage} from "../actors/IActor";
import {IActorMultiSystem} from "../actors/IActorSystem";
import {IActorCommand} from "./IActorCommand";

export default abstract class AbstractCommand implements IActorCommand {

    protected message: CommandMessage;
    protected system: IActorMultiSystem

    protected constructor(system: IActorMultiSystem, message: CommandMessage) {
        this.message = message;
        this.system = system;
    }

    public abstract execute();
}
