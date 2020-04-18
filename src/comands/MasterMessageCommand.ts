import AbstractCommand from "./AbstractCommand";

class MasterMessageCommand extends AbstractCommand {
    execute() {
        const { data } = this.message;
        this.system.send(name, data);
    }
}

export default MasterMessageCommand;
