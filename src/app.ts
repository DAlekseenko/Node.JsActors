import { createInterface } from 'readline';

const RL = createInterface({
  input: process.stdin,
  output: process.stdout
});


function main() {
  RL.question('Set your work model! Or write help ', answer => {
    if (answer === 'help') {

      console.log('1. Multi process');

      console.log('2. Multi tread');
      console.log('3. Single tread');
      RL.close();
      return main();
    }

    if (answer === '3') {
      require('./singletrhead/main');
      return;
    }

    RL.close();
    process.exit(0);
  });
}

main();
