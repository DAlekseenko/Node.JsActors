import AbstractCommand from "../AbstractCommand";
import {Command} from "../contracts/Command";
import {MasterSystem} from "../../systems/contracts/MasterSystem";

class MasterStopCommand extends AbstractCommand<MasterSystem> implements Command {
    execute() {
        const { name } = this.message;
        this.system.stop(name);
    }
}

export default MasterStopCommand;
