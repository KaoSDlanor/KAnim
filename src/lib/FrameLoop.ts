export class FrameLoop {
  private frameRequest?: number;

  constructor(readonly callback: Function,private running: boolean = true) { };

  get status(): boolean {
    return this.running;
  };

  start(): FrameLoop {
    this.running = true;
    this.queue();
    return this;
  };

  stop(): FrameLoop {
    this.running = false;
    this.queue();
    return this;
  };

  queue(): FrameLoop {
    if (this.frameRequest != null) window.cancelAnimationFrame(this.frameRequest);
    if (this.running) {
      this.frameRequest = window.requestAnimationFrame(() => this.execute());
    } else {
      this.frameRequest = undefined;
    }
    return this;
  };

  execute(): FrameLoop {
    this.queue();
    this.callback();
    return this;
  };
};

export default FrameLoop;