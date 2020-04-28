import {Actor, Actors} from "./contracts/Actor";
import {System} from "../systems/contracts/System";

const TO = 'actor-log@rambler.ru';

class Renderer implements Actor {

    constructor(
        private readonly system: System
    ) {
        console.log(this.system);
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


