import {CommandMessage, EmailMessage, RenderMessage} from "../../messaging/MessageContracts";
import {WorkerSystem} from "../../systems/contracts/WorkerSystem";
import {MasterSystem} from "../../systems/contracts/MasterSystem";

export interface Command {
    execute();
}

export interface WorkerCommandConstructor extends Command {
    new(system: WorkerSystem, message: CommandMessage): Command;
}

export interface MasterCommandConstructor extends Command {
    new(system: MasterSystem, message: EmailMessage | RenderMessage): Command;
}
