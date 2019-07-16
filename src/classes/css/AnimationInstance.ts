import {milliseconds,unixTimestamp,percentage,CSSPropertyValue,relativeCSSAnimationOptions} from '../../lib/types';
import EasingFunctions,{EasingFunction} from '../../lib/EasingFunctions';

export class AnimationInstance {
  readonly startTime  : unixTimestamp = +new Date();
  readonly duration   : milliseconds;
  readonly offset?    : CSSPropertyValue;
  readonly to?        : CSSPropertyValue;
  readonly easingFunc : EasingFunction;

  constructor(animationOptions: relativeCSSAnimationOptions) {
    if ('startTime' in animationOptions) this.startTime = animationOptions.startTime;

    this.duration = animationOptions.duration;
    this.offset = animationOptions.offset;
    this.to = animationOptions.to;

    if (animationOptions.easing instanceof Function) {
      this.easingFunc = animationOptions.easing;
    } else if (EasingFunctions[animationOptions.easing] instanceof Function) {
      this.easingFunc = EasingFunctions[animationOptions.easing];
    } else {
      throw Object.assign(new Error('Invalid easing'),{easing : animationOptions.easing});
    };
  };

  isDone(unixTimestamp: unixTimestamp): boolean {
    return unixTimestamp >= this.startTime + this.duration;
  };

  computePct(unixTimestamp: unixTimestamp): percentage {
    const difference: milliseconds = unixTimestamp - this.startTime;
    return Math.min(1,Math.max(0,difference / this.duration));
  };
};

export default AnimationInstance;