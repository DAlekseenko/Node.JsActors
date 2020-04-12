import { get } from 'http';
import {  IActor, Actors, EmailMessage, RenderMessage } from './IActor';
import { IActorSystem } from '../IActorSystem';

const URL = 'http://localhost:8000/';
const INTERVAL = 2000;

class Monitoring implements IActor {

    private allowed: boolean = true;
    private readonly timer: NodeJS.Timer;
    private system: IActorSystem;

    constructor(system: IActorSystem) {
      this.system = system;
      console.log('Start actor: Monitoring');
      this.timer = setInterval(() => {
        this.attempt(URL);
      }, INTERVAL);
    }

    attempt(url) {
      get(url, res => {
        const success = res.statusCode === 200;
        this.notify({ url, success, status: res.statusCode });
      }).on('error', error => {
        this.notify({ url, success: false, status: error.message });
      });
    }

    notify({ url, success, status }: RenderMessage) {
      if (this.allowed !== success) {
        this.allowed = success;
        this.system.send(Actors.RENDERER, { url, success, status });
      }
    }

    async exit() {
      clearInterval(this.timer);
      console.log('Stop actor: Monitoring');
    }

    async message(message?: EmailMessage | RenderMessage) {
      console.log('Monitoring message', message);
    }
}

export default Monitoring;
