import AbstractCommand from "./AbstractCommand";
import ActorStartCommand from "./ActorStartCommand";
import ActorStopCommand from "./ActorStopCommand";
import ActorMessageCommand from "./ActorMessageCommand";
import MasterStartCommand from "./MasterStartCommand";
import MasterMessageCommand from "./MasterReadyCommand";
import MasterStopCommand from "./MasterStopCommand";
import MasterReadyCommands from "./MasterMessageCommand";

export enum Commands {
    START = 'start',
    STOP = 'stop',
    MESSAGE = 'message',
    READY = 'ready'
}

export const ActorsCommands = new Map<string, AbstractCommand>([
    [Commands.MESSAGE, ActorMessageCommand.prototype],
    [Commands.START, ActorStartCommand.prototype],
    [Commands.STOP, ActorStopCommand.prototype],
]);

export const MasterCommands = new Map<string, AbstractCommand>([
    [Commands.MESSAGE, MasterMessageCommand.prototype],
    [Commands.START, MasterStartCommand.prototype],
    [Commands.STOP, MasterStopCommand.prototype],
    [Commands.READY, MasterReadyCommands.prototype],
]);
