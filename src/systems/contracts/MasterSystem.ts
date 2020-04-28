import {Actor, Actors} from "../../actors/contracts/Actor";
import {System} from "./System";
import {SystemControlProps} from "./SystemControlProps";
import {ChildProcess} from "child_process";

export interface MasterSystem extends System {
    workers: Map<Actors, SystemControlProps<ChildProcess>>;
    subscribe: (name: Actor) => void;
}
