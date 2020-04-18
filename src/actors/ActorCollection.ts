import Mailer from "./Mailer";
import Monitoring from "./Monitoring";
import Renderer from "./Renderer";
import {Actors, IActor} from "./IActor";
import Root from "./Root";

export default new Map<string, IActor>([
    [Actors.MAILER, Mailer.prototype],
    [Actors.MONITORING, Monitoring.prototype],
    [Actors.RENDERER, Renderer.prototype],
    [Actors.ROOT, Root.prototype]
]);

