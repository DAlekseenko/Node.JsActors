import { parentPort, threadId } from 'worker_threads';
import { Actor } from '../actors/contracts/Actor';
import { Commands, WorkerCommands } from '../comands/CommandCollection';
import { WorkerCommandConstructor } from '../comands/contracts/Command';

class WorkerSystem {

  static instance: Actor;

  static start(name, count = 1) {
    parentPort?.postMessage({ command: Commands.START, name, count });
  }

  static stop(name) {
    parentPort?.postMessage({ command: Commands.STOP, name });
  }

  static send(name, data) {
    parentPort?.postMessage({ command: Commands.MESSAGE, name, data });
  }

  static ready(name) {
    parentPort?.postMessage({ command: Commands.READY, name, pid: threadId });
  }
}

parentPort?.on('message', message => {
  const Command = WorkerCommands.get(message.command) as WorkerCommandConstructor | undefined;
  if (Command) {
    const command = new Command(WorkerSystem, message);
    command.execute();
  }
});

export default WorkerSystem;
