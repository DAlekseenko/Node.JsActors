
export type Callback = (err: null| string | object,  data: any) => void

export interface IQueue {
    add: (task: any, priority?: number) => void;
    wait: (milliseconds: number) => IQueue;
    timeout: (milliseconds: number) => IQueue;
    process: (listener: Callback) => IQueue;
    done: (listener: Callback) => IQueue;
    success: (listener: Callback) => IQueue;
    failure: (listener: Callback) => IQueue;
    drain: (listener: Callback) => IQueue;
    pause: () => IQueue;
    resume: () => IQueue;
    priority: () => IQueue;
    pipe: (destination: unknown) => IQueue;
}

export interface WaitingTask {
    task: any;
    start: number;
    priority: number;
}

