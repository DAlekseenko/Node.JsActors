import { IActorSystem } from '../IActorSystem';

export type EmailMessage = {
    to: string;
    subject: string;
    message: string;
}

export type RenderMessage = {
    url: string;
    success: boolean;
    status?: number | string;
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


