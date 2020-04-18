import AbstractCommand from "./AbstractCommand";

class MasterStartCommand extends AbstractCommand {
    execute() {
        const { count } = this.message;
        this.system.start(name, count);
    }
}

export default MasterStartCommand;
