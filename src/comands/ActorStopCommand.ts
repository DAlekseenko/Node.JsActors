import AbstractCommand from "./AbstractCommand";

class ActorStopCommand extends AbstractCommand {
    execute() {
        const {instance} = this.system;
        if (instance) instance.exit();
        process.exit(0);
    }
}

export default ActorStopCommand;
