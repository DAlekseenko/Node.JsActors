import {
    Actors, CommandMessage, EmailMessage, IActor, IActorObject, RenderMessage
} from './IActor';

export interface IActorControl<T = IActor> {
    actor?: Function;
    instances: Array<T>;
    ready: Array<T>;
    queue: Array<EmailMessage | RenderMessage | undefined>;
}

export interface IActorSystem {
    register: (actor: IActor) => void;
    start: (name: Actors, count?: number) => void;
    stop: (name: Actors) => void;
    send: (name: Actors, message?: EmailMessage | RenderMessage) => void;
}

export interface IActorMultiSystem extends IActorSystem {
    pid?: number,
    actor?: IActorObject;
    instance: IActor;
    ready: (name: Actors) => void;
    actors?: typeof Map.prototype
}

export interface IActorMultiSystemMaster {
    pid: number;
    send: (message: CommandMessage) => void;
}
