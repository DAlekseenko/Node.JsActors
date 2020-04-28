import AbstractCommand from "../AbstractCommand";
import {MasterSystem} from "../../systems/contracts/MasterSystem";
import {Command} from "../contracts/Command";

class MasterMessageCommand extends AbstractCommand<MasterSystem> implements Command {
    execute() {
        const { name, data } = this.message;
        this.system.send(name, data);
    }
}

export default MasterMessageCommand;
