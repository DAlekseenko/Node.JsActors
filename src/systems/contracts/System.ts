import {Actors} from "../../actors/contracts/Actor";
import {EmailMessage, RenderMessage} from "../../messaging/MessageContracts";


export interface System {
    start: (name: Actors, count?: number) => void;
    stop: (name: Actors) => void;
    send: (name: Actors, message?: EmailMessage | RenderMessage) => void;
}
