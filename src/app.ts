import {createInterface} from 'readline';
import {Actors} from './actors/IActor';
import {IActorSystem} from "./actors/IActorSystem";

const RL = createInterface({
    input: process.stdin,
    output: process.stdout
});

const EXIT_NORMAL = 1000;
const EXIT_ABNORMAL = 5000;

let system: IActorSystem;

function main() {
    RL.question('Set your work model! Or write help ', async (answer) => {
        if (answer === 'help') {
            console.log('1. Multi process');
            console.log('2. Multi tread');
            console.log('3. Single tread');
            RL.close();
            return main();
        }

        if (answer === '1') {
            try {
               const imorted = await import('./multiprocess/system');
               system = imorted.default
            } catch (e) {
                console.log('Module load failed');
                return main();
            }
        }


        if (answer === '3') {
            require('./singletrhead/main');
            return;
        }
        if (system) {
            system.start(Actors.ROOT);
            return;
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
