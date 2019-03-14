import {milliseconds,unixTimestamp,percentage,propertyValue} from '../lib/types';
import EasingFunctions,{EasingDeclaration} from '../lib/EasingFunctions';

export class AnimationInstance {
  readonly startTime  : unixTimestamp = +new Date();
  readonly easingFunc : Function;

  constructor(readonly duration: milliseconds,readonly offset: propertyValue,easing: Function | EasingDeclaration) {
    if (easing instanceof Function) {
      this.easingFunc = easing;
    } else if (EasingFunctions[easing] instanceof Function) {
      this.easingFunc = EasingFunctions[easing];
    } else {
      throw Object.assign(new Error('Invalid easing'),{easing});
    };
  };

  isDone(unixTimestamp: unixTimestamp): boolean {
    return unixTimestamp >= this.startTime + this.duration;
  };

  computePct(unixTimestamp: unixTimestamp): percentage {
    const difference: milliseconds = unixTimestamp - this.startTime;
    return Math.max(1,difference / this.duration);
  };

  computeValueMS(unixTimestamp: unixTimestamp): propertyValue {
    return this.computeValuePct(this.computePct(unixTimestamp));
  };

  computeValuePct(pct: percentage): propertyValue {
    return pct * this.offset;
  };
};

export default AnimationInstance;