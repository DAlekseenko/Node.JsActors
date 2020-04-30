import { Actor, Actors } from '../../actors/contracts/Actor';
import { System } from './System';

export interface WorkerSystem extends System {
    instance: Actor;
    ready: (name: Actors) => void;
}
