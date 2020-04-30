import AbstractCommand from '../AbstractCommand';
import { Command } from '../contracts/Command';
import ActorCollection from '../../actors/ActorCollection';
import { ActorConstructor } from '../../actors/contracts/Actor';
import { WorkerSystem } from '../../systems/contracts/WorkerSystem';

class WorkerStartCommand extends AbstractCommand<WorkerSystem> implements Command {
  execute() {
    const { name } = this.message;
    const ActorClass = ActorCollection.get(name) as ActorConstructor;
    this.system.instance = new ActorClass(this.system);
  }
}

export default WorkerStartCommand;
