import Mailer from "./Mailer";
import Monitoring from "./Monitoring";
import Renderer from "./Renderer";
import Root from "./Root";
import {Actors} from "./contracts/Actor";

export default new Map<string, object>([
    [Actors.MAILER, Mailer],
    [Actors.MONITORING, Monitoring],
    [Actors.RENDERER, Renderer],
    [Actors.ROOT, Root]
]);

