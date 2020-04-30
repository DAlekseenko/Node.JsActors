import { createInterface } from 'readline';
import { System } from './systems/contracts/System';
import { Actors } from './actors/contracts/Actor';

const RL = createInterface({
  input: process.stdin,
  output: process.stdout
});

const EXIT_NORMAL = 1000;
const EXIT_ABNORMAL = 5000;

let system: System;

function main() {

  RL.question('Set your work model! Or write help ', async answer => {
    if (answer === 'help') {
      console.log('1. Multi process');
      console.log('2. Multi tread');
      console.log('3. Single tread');
      return main();
    }

    let approach: string = '';

    switch (answer) {
    case '1':
      approach = 'multiprocess';
      break;
    case '2':
      approach = 'multithread';
      break;
    case '3':
      approach = 'singletrhead';
      break;
    }

    if (approach) {
      try {
        const imported = await import(`./${approach}/system`);

        system = imported.default as System;

        return system.start(Actors.ROOT);
      } catch (e) {
        console.log('Module load failed', e);
        return main();
      }
    }

    RL.close();
    process.exit(0);
  });
}

main();


process.on('SIGINT', () => {
  if (system) {
    system.stop(Actors.ROOT);
  }
  setTimeout(() => {
    console.log('Graceful shutdown');
    process.exit(0);
  }, EXIT_NORMAL);
  setTimeout(() => {
    console.log('Abnormal termination');
    process.exit(1);
  }, EXIT_ABNORMAL);
});
