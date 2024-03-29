import {milliseconds,unixTimestamp,percentage,elementPropertyValue,relativeElementAnimationOptions} from '../../lib/types';
import EasingFunctions,{EasingFunction} from '../../lib/EasingFunctions';

export class AnimationInstance {
  readonly startTime  : unixTimestamp = +new Date();
  readonly duration   : milliseconds;
  readonly offset     : elementPropertyValue;
  readonly easingFunc : EasingFunction;

  private  complete   : () => void
  readonly done       : Promise<void>

  constructor(animationOptions: relativeElementAnimationOptions) {
    if (animationOptions.startTime != null) this.startTime = animationOptions.startTime;

    this.duration = animationOptions.duration;
    this.offset = animationOptions.offset;

    if (animationOptions.easing instanceof Function) {
      this.easingFunc = animationOptions.easing;
    } else if (EasingFunctions[animationOptions.easing] instanceof Function) {
      this.easingFunc = EasingFunctions[animationOptions.easing];
    } else {
      throw Object.assign(new Error('Invalid easing'),{easing : animationOptions.easing});
    };

    this.done = new Promise((resolve) => {
      this.complete = resolve;
    });
  };

  isDone(unixTimestamp: unixTimestamp): boolean {
    const isDone = unixTimestamp >= this.startTime + this.duration;
    if (isDone) this.complete();
    return isDone;
  };

  computePct(unixTimestamp: unixTimestamp): percentage {
    const difference: milliseconds = unixTimestamp - this.startTime;
    return Math.min(1,Math.max(0,difference / this.duration));
  };

  computeValueMS(unixTimestamp: unixTimestamp): elementPropertyValue {
    return this.computeValuePct(this.computePct(unixTimestamp));
  };

  computeValuePct(pct: percentage): elementPropertyValue {
    return this.easingFunc(pct) * this.offset;
  };
};

export default AnimationInstance;