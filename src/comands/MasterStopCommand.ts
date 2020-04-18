import AbstractCommand from "./AbstractCommand";
import {Actors} from "../actors/IActor";

class MasterStopCommand extends AbstractCommand {
    execute() {
        const { name } = this.message;
        this.system.stop(name as Actors);
    }
}

export default MasterStopCommand;
