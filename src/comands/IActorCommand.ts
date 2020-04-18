import {CommandMessage, IActor} from "../actors/IActor";
import {IActorMultiSystem} from "../actors/IActorSystem";

export interface IActorCommand {
    execute();
}

export interface IActorCommandConstructor extends IActorCommand{
    new(system: IActorMultiSystem, message: CommandMessage): IActorCommand;
}
