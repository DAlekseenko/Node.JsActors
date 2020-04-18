import AbstractCommand from "./AbstractCommand";

class MasterReadyCommand extends AbstractCommand {
    execute() {
        const { pid } = this.message;
        const record = this.system.actors.get(name);
        if (record) {
            const { ready, instances, queue } = record;
            for (const actor of instances) {
                if (actor.pid === pid) ready.push(actor);
            }
            if (queue.length > 0) {
                const next = queue.shift();
                this.system.send(name, next);
            }
        }
    }
}

export default MasterReadyCommand;
