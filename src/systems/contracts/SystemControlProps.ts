import { Actor, Actors } from '../../actors/contracts/Actor';
import { EmailMessage, RenderMessage } from '../../messaging/MessageContracts';
import { IQueue } from '../../queue/contracts/Queue';

export interface SystemControlProps<T = Actor> {
    instances: Array<T>;
    ready: Array<T>;
    queue: IQueue<{ name: Actors; message?: EmailMessage | RenderMessage; timeout: number }>;
}
