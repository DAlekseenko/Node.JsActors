import AbstractCommand from '../AbstractCommand';
import { Command } from '../contracts/Command';
import { WorkerSystem } from '../../systems/contracts/WorkerSystem';

class WorkerStopCommand extends AbstractCommand<WorkerSystem> implements Command {
  execute() {
    const { instance } = this.system;
    if (instance) instance.exit();
    process.exit(0);
  }
}

export default WorkerStopCommand;
