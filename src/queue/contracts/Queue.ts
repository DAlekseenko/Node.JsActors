
export type Callback = (err: null| string | object,  data: any) => void

export interface IQueue<T> {
    add: (task: T, priority?: number) => void;
    wait: (milliseconds: number) => IQueue<T>;
    timeout: (milliseconds: number) => IQueue<T>;
    process: (listener: Callback) => IQueue<T>;
    done: (listener: Callback) => IQueue<T>;
    success: (listener: Callback) => IQueue<T>;
    failure: (listener: Callback) => IQueue<T>;
    drain: (listener: Callback) => IQueue<T>;
    pause: () => IQueue<T>;
    resume: () => IQueue<T>;
    priority: () => IQueue<T>;
    pipe: (destination: IQueue<T>) => IQueue<T>;
}

export interface WaitingTask {
    task: any;
    start: number;
    priority: number;
}

