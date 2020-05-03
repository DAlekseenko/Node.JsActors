import { Callback, IQueue, WaitingTask } from './contracts/Queue';

type Timeout = NodeJS.Timeout;

type OnProcess = (task: any, finish: Callback) => void;
type OnDrain = () => void;

class Queue<T> implements IQueue<T> {

    private paused = false;
    private readonly concurrency;
    private count = 0;
    private waiting: WaitingTask[] = [];
    private waitTimeout = Infinity;
    private processTimeout = Infinity;
    private priorityMode = false;

    private onProcess: null | OnProcess = null

    private onFailure: null | Callback = null
    private onSuccess: null | Callback = null
    private onDone: null | Callback = null
    private onDrain: null | OnDrain = null
    private destination: null | IQueue<T> = null

    constructor(concurrency) {
      this.concurrency = concurrency;

    }

    static channels(concurrency) {
      return new Queue(concurrency);
    }

    public add(task: T, priority = 0) {
      if (!this.paused) {
        const hasChannel = this.count < this.concurrency;
        if (hasChannel) {
          this.next(task);
          return;
        }
      }
      this.waiting.push({ task, start: Date.now(), priority });
      if (this.priorityMode) {
        this.waiting.sort((a, b) => b.priority - a.priority);
      }
    }

    private next(task: T) {
      this.count++;
      let timer: Timeout | null = null;
      let finished = false;
      const { processTimeout, onProcess } = this;
      const finish = (err, res) => {
        if (finished) return;
        finished = true;
        if (timer) clearTimeout(timer);
        this.count--;
        this.finish(err, res);
        if (!this.paused && this.waiting.length > 0) this.takeNext();
      };
      if (processTimeout !== Infinity) {
        timer = setTimeout(() => {
          timer = null;
          const err = new Error('Process timed out');
          finish(err, task);
        }, processTimeout);
      }
      onProcess && onProcess(task, finish);
    }

    private takeNext() {
      const { waiting, waitTimeout } = this;

      const { task, start } = waiting.shift() || { task: {}, start: 0 };
      if (waitTimeout !== Infinity) {
        const delay = Date.now() - start;
        if (delay > waitTimeout) {
          const err = new Error('Waiting timed out');
          this.finish(err, task);
          if (waiting.length > 0) {
            setTimeout(() => {
              if (!this.paused && waiting.length > 0) this.takeNext();
            });
          }
          return;
        }
      }
      const hasChannel = this.count < this.concurrency;
      if (hasChannel) this.next(task);

    }

    private finish(err, res) {
      const { onFailure, onSuccess, onDone, onDrain } = this;
      if (err) {
        if (onFailure) onFailure(err, res);
      } else {
        if (onSuccess) onSuccess(null, res);
        if (this.destination) this.destination.add(res);
      }
      if (onDone) onDone(err, res);
      if (this.count === 0 && onDrain) onDrain();
    }


    wait(milliseconds) {
      this.waitTimeout = milliseconds;
      return this;
    }

    timeout(milliseconds) {
      this.processTimeout = milliseconds;
      return this;
    }

    process(listener) {
      this.onProcess = listener;
      return this;
    }

    done(listener) {
      this.onDone = listener;
      return this;
    }

    success(listener) {
      this.onSuccess = listener;
      return this;
    }

    failure(listener) {
      this.onFailure = listener;
      return this;
    }

    drain(listener) {
      this.onDrain = listener;
      return this;
    }

    pause() {
      this.paused = true;
      return this;
    }

    resume() {
      if (this.waiting.length > 0) {
        const channels = this.concurrency - this.count;
        for (let i = 0; i < channels; i++) {
          this.takeNext();
        }
      }
      this.paused = false;
      return this;
    }

    priority(flag = true) {
      this.priorityMode = flag;
      return this;
    }

    pipe(destination) {
      this.destination = destination;
      return this;
    }
}

export default Queue;
