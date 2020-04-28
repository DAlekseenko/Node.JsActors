import {Actor, Actors} from "./contracts/Actor";
import {System} from "../systems/contracts/System";

class Root implements Actor {

    constructor(
        private readonly system: System
    ) {
      this.start();
    }

    start() {
      console.log('Start actor: Root');
      this.system.start(Actors.MONITORING);
      this.system.start(Actors.RENDERER);
      this.system.start(Actors.MAILER, 3);
    }

    async message(message?: any) {
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
