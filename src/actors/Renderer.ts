import { Actors, IActor } from './IActor';
import { IActorSystem } from '../IActorSystem';

const TO = 'actor-log@rambler.ru';

class Renderer implements IActor {

    private system: IActorSystem;

    constructor(system: IActorSystem) {
      this.system = system;
      console.log('Start actor: Renderer');
    }

    async message({ url, success, status }) {

      const msg = success ? 'is available again' : 'is not available';
      const date = new Date().toUTCString();
      const reason = (success ? 'Status code: ' : 'Error code: ') + status;
      const message = `Resource ${url} ${msg} (${date})\n${reason}`;
      const subject = 'Server Monitoring';
      this.system.send(Actors.MAILER, { to: TO, subject, message });
    }

    async exit() {
      console.log('Stop actor: Renderer');
    }
}

export default Renderer;


