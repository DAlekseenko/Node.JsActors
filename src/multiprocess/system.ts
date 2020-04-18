import worker from './worker';
import master from './master';

let exported = master;

// @ts-ignore
if (process.channel) {
    // @ts-ignore
    exported = worker
}

export default exported;

