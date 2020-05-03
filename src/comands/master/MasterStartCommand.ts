import AbstractCommand from '../AbstractCommand';
import { Command } from '../contracts/Command';
import { MasterSystem } from '../../systems/contracts/MasterSystem';

class MasterStartCommand extends AbstractCommand<MasterSystem> implements Command {
  execute() {
    const { count, name } = this.message;
    if (name) {
      this.system.start(name, count);
    }
  }
}

export default MasterStartCommand;
