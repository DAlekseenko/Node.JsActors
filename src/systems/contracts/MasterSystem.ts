import { Actor, Actors } from '../../actors/contracts/Actor';
import { System } from './System';
import { SystemControlProps } from './SystemControlProps';
import { ChildProcess } from 'child_process';
import { Worker } from 'worker_threads';

export type WorkerThread = Worker;

export interface MasterSystem extends System {
    workers: Map<Actors, SystemControlProps<ChildProcess | WorkerThread>>;
    subscribe: (name: Actor) => void;
}
