import AbstractCommand from "./AbstractCommand";
import MasterMessageCommand from "./master/MasterMessageCommand";
import MasterStartCommand from "./master/MasterStartCommand";
import MasterReadyCommand from "./master/MasterReadyCommand";
import MasterStopCommand from "./master/MasterStopCommand";
import {MasterSystem} from "../systems/contracts/MasterSystem";
import WorkerMessageCommand from "./worker/WorkerMessageCommand";
import WorkerStartCommand from "./worker/WorkerStartCommand";
import WorkerStopCommand from "./worker/WorkerStopCommand";
import {WorkerSystem} from "../systems/contracts/WorkerSystem";

export enum Commands {
    START = 'start',
    STOP = 'stop',
    MESSAGE = 'message',
    READY = 'ready'
}

// @ts-ignore
export const WorkerCommands = new Map<string, AbstractCommand<WorkerSystem>>([
    [Commands.MESSAGE, WorkerMessageCommand],
    [Commands.START, WorkerStartCommand],
    [Commands.STOP, WorkerStopCommand],
]);

// @ts-ignore
export const MasterCommands = new Map<string, AbstractCommand<MasterSystem>>([
    [Commands.MESSAGE, MasterMessageCommand],
    [Commands.START, MasterStartCommand],
    [Commands.STOP, MasterStopCommand],
    [Commands.READY, MasterReadyCommand],
]);
