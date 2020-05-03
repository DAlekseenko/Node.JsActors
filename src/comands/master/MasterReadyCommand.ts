import AbstractCommand from '../AbstractCommand';
import { MasterSystem } from '../../systems/contracts/MasterSystem';
import { Command } from '../contracts/Command';


class MasterReadyCommand extends AbstractCommand<MasterSystem> implements Command {
  execute() {
    const { pid, name } = this.message;

    const record = this.system.workers.get(name);

    if (record) {

      const { ready, instances } = record;
      for (const worker of instances) {

        // @ts-ignore
        if (worker.pid && worker.pid === pid) {
          ready.push(worker);
        }

        // @ts-ignore
        if (worker.threadId && worker.threadId === pid) {
          ready.push(worker);
        }
      }

    }
  }
}

export default MasterReadyCommand;
