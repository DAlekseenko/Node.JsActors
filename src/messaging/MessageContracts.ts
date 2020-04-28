import {Commands} from "../comands/CommandCollection";
import {Actors} from "../actors/contracts/Actor";

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
    name: Actors
    data?: EmailMessage | RenderMessage
    count: number
    pid: number
}
