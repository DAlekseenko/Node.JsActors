import { isMainThread } from 'worker_threads';
import worker from './worker';
import master from './master';

let exported = master;

if (!isMainThread) {
  // @ts-ignore
  exported = worker;
}

export default exported;
