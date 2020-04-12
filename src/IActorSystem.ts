import {
  Actors, EmailMessage, IActor, RenderMessage
} from './actors/IActor';

export interface IActorControl {
    actor: Function;
    instances: Array<IActor>;
    ready: Array<IActor>;
    queue: Array<EmailMessage | RenderMessage | undefined>;
}

export interface IActorSystem {
    register: (actor: IActor) => void;
    start: (name: Actors, count?: number) => void;
    stop: (name: Actors) => void;
    send: (name: Actors, message?: EmailMessage | RenderMessage) => void;
}

