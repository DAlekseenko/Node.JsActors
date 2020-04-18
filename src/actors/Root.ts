import { Actors, EmailMessage, IActor, RenderMessage } from './IActor';
import { IActorSystem } from './IActorSystem';

class Root implements IActor {

    private system: IActorSystem

    constructor(system: IActorSystem) {
      console.log('here');
      this.system = system;
      this.start();
    }

    start() {
      console.log('Start actor: Root');
      this.system.start(Actors.MONITORING);
      this.system.start(Actors.RENDERER);
      this.system.start(Actors.MAILER, 3);
    }

    async message(message?: EmailMessage | RenderMessage) {
      console.log('Monitoring message', message);
    }

    async exit() {
      this.system.stop(Actors.MONITORING);
      this.system.stop(Actors.RENDERER);
      this.system.stop(Actors.MAILER,);
      console.log('Stop actor: Root');
    }
}

export default Root;
