import AbstractCommand from '../AbstractCommand';
import { MasterSystem } from '../../systems/contracts/MasterSystem';
import { Command } from '../contracts/Command';


class MasterReadyCommand extends AbstractCommand<MasterSystem> implements Command {
  execute() {
    const { pid, name } = this.message;

    const record = this.system.workers.get(name);

    if (record) {
      const { ready, instances, queue } = record;
      for (const worker of instances) {

        if (worker.pid && worker.pid === pid) {
          ready.push(worker);
        }

        if (worker.threadId && worker.threadId === pid) {
          ready.push(worker);
        }
      }
      if (queue.length > 0) {
        const next = queue.shift();
        this.system.send(name, next);
      }
    }
  }
}

export default MasterReadyCommand;
