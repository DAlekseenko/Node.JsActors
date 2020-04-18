import {IActorSystem} from './IActorSystem';
import {Commands} from "../comands/CommandCollection";

export interface EmailMessage {
    to: string;
    subject: string;
    message: string;
}

export interface RenderMessage {
    url: string;
    success: boolean;
    status?: number | string;
}

export interface CommandMessage {
    command: Commands
    name?: string
    data?: EmailMessage | RenderMessage
    count?: number
    pid?: number
}

export enum Actors {
    ROOT = 'Root',
    MAILER = 'Mailer',
    MONITORING = 'Monitoring',
    RENDERER = 'Renderer',
}


export interface IActor {

    message(message?: EmailMessage | RenderMessage);

    exit();
}

export interface IActorObject extends IActor {
    new(system: IActorSystem): IActor;
}
