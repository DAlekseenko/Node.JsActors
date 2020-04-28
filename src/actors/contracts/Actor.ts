import {EmailMessage, RenderMessage} from "../../messaging/MessageContracts";
import {System} from "../../systems/contracts/System";

export enum Actors {
    ROOT = 'Root',
    MAILER = 'Mailer',
    MONITORING = 'Monitoring',
    RENDERER = 'Renderer',
}

export interface Actor {

    message(message?: RenderMessage | EmailMessage);

    exit();
}

export interface ActorConstructor extends Actor {
    new(system: System): Actor;
}
