import {Actor} from "../../actors/contracts/Actor";
import {EmailMessage, RenderMessage} from "../../messaging/MessageContracts";

export interface SystemControlProps<T = Actor> {
    instances: Array<T>;
    ready: Array<T>;
    queue: Array<EmailMessage | RenderMessage | undefined>;
}
