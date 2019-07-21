import {unixTimestamp,percentage,CSSPropertyValue,CSSAnimationOptions,relativeCSSAnimationOptions} from '../../lib/types';
import AnimationInstance from './AnimationInstance';

export class AnimationGroup {
  constructor(public currentValue: CSSPropertyValue,readonly animationList: Set<AnimationInstance> = new Set()) { };

  get targetValue(): CSSPropertyValue {
    let targetValue: CSSPropertyValue = this.currentValue;
    for (const animationItem of this.animationList) {
      const percentage: percentage = 1;
      const value = animationItem.offset + ' * ' + percentage;
      if (animationItem.offset) {
        targetValue += ` + ${value}`;
      } else if (animationItem.to) {
        targetValue = `(${targetValue}) * ${1-percentage} + ${value}`
      }
    };
    return `calc(${targetValue})`;
  };

  isDone(unixTimestamp: unixTimestamp): boolean {
    for (const animationItem of this.animationList) {
      if (!animationItem.isDone(unixTimestamp)) return false;
    };
    return true;
  };

  clearAnimations(currentValue: CSSPropertyValue): void {
    this.animationList.clear();
    this.currentValue = currentValue;
  };

  cleanAnimations(unixTimestamp: unixTimestamp): void {
    for (const animationItem of this.animationList) {
      if (animationItem.isDone(unixTimestamp)) {
        if (animationItem.offset) this.currentValue += ` + ${animationItem.offset}`;
        if (animationItem.to) this.currentValue = animationItem.to;
        this.animationList.delete(animationItem);
      };
    };
  };

  computeValueMS(unixTimestamp: unixTimestamp): CSSPropertyValue {
    let computedValue: CSSPropertyValue = this.currentValue;
    for (const animationItem of this.animationList) {
      const percentage = animationItem.easingFunc(animationItem.computePct(unixTimestamp));
      if (animationItem.offset) {
        computedValue += ` + (${animationItem.offset}) * ${percentage}`;
      } else if (animationItem.to) {
        computedValue = `(${computedValue}) * ${1-percentage} + (${animationItem.to}) * ${percentage}`
      }
    };
    return `calc(${computedValue})`;
  };

  animate(CSSAnimationOptions: CSSAnimationOptions): void {
    if ('startTime' in CSSAnimationOptions) this.cleanAnimations(CSSAnimationOptions.startTime);
    this.animationList.add(new AnimationInstance(CSSAnimationOptions));
  };
};

export default AnimationGroup;