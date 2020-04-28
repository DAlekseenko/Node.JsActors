import AbstractCommand from "../AbstractCommand";
import {Command} from "../contracts/Command";
import {Actors} from "../../actors/contracts/Actor";
import {WorkerSystem} from "../../systems/contracts/WorkerSystem";

class WorkerMessageCommand extends AbstractCommand<WorkerSystem> implements Command   {
    execute() {
        const {instance} = this.system;
        if (instance) {
            const {data} = this.message;

            const {name} = instance.constructor;
            console.log({name}, 'ActorStartCommand');

            instance.message(data);
            this.system.ready(name as Actors);
        }
    }
}

export default WorkerMessageCommand;
