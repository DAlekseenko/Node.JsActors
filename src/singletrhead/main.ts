import ActorSystem from './system';
import { Actors } from '../actors/IActor';
import Mailer from '../actors/Mailer';
import Monitoring from '../actors/Monitoring';
import Renderer from '../actors/Renderer';
import Root from '../actors/Root';

const EXIT_NORMAL = 1000;
const EXIT_ABNORMAL = 5000;

ActorSystem.register(Root.prototype);
ActorSystem.register(Mailer.prototype);
ActorSystem.register(Monitoring.prototype);
ActorSystem.register(Renderer.prototype);


ActorSystem.start(Actors.ROOT);


process.on('SIGINT', () => {

  ActorSystem.stop(Actors.ROOT);
  setTimeout(() => {
    console.log('Graceful shutdown');
    process.exit(0);
  }, EXIT_NORMAL);
  setTimeout(() => {
    console.log('Abnormal termination');
    process.exit(1);
  }, EXIT_ABNORMAL);
});
