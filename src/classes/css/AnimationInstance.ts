import {milliseconds,unixTimestamp,percentage,CSSPropertyValue,CSSAnimationOptions, relativeCSSAnimationOptions, absoluteCSSAnimationOptions} from '../../lib/types';
import EasingFunctions,{EasingFunction} from '../../lib/EasingFunctions';

export class AnimationInstance {
  readonly startTime  : unixTimestamp = +new Date();
  readonly duration   : milliseconds;
  readonly offset?    : CSSPropertyValue;
  readonly to?        : CSSPropertyValue;
  readonly easingFunc : EasingFunction;

  constructor(CSSAnimationOptions: CSSAnimationOptions) {
    if ('startTime' in CSSAnimationOptions) this.startTime = CSSAnimationOptions.startTime;

    this.duration = CSSAnimationOptions.duration;
    
    if ((<absoluteCSSAnimationOptions>CSSAnimationOptions).to) {
      this.to = (<absoluteCSSAnimationOptions>CSSAnimationOptions).to;
    } else {
      this.offset = (<relativeCSSAnimationOptions>CSSAnimationOptions).offset;
    }

    if (CSSAnimationOptions.easing instanceof Function) {
      this.easingFunc = CSSAnimationOptions.easing;
    } else if (EasingFunctions[CSSAnimationOptions.easing] instanceof Function) {
      this.easingFunc = EasingFunctions[CSSAnimationOptions.easing];
    } else {
      throw Object.assign(new Error('Invalid easing'),{easing : CSSAnimationOptions.easing});
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