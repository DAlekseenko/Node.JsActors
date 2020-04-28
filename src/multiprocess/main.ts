import ActorSystem from './system';
import { Actors } from '../actors/ActorContract';

const EXIT_NORMAL = 1000;
const EXIT_ABNORMAL = 5000;

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
