import {unixTimestamp,propertyValue,animationOptions,relativeAnimationOptions} from '../lib/types';
import AnimationInstance from './AnimationInstance';

export class AnimationGroup {
  constructor(public currentValue: propertyValue,readonly animationList: Set<AnimationInstance> = new Set()) { };

  get targetValue(): propertyValue {
    let targetValue: propertyValue = this.currentValue;
    for (const animationItem of this.animationList) {
      targetValue += animationItem.computeValuePct(1);
    };
    return targetValue;
  };

  isDone(unixTimestamp: unixTimestamp): boolean {
    for (const animationItem of this.animationList) {
      if (!animationItem.isDone(unixTimestamp)) return false;
    };
    return true;
  };

  clearAnimations(currentValue: propertyValue): void {
    this.animationList.clear();
    this.currentValue = currentValue;
  };

  cleanAnimations(unixTimestamp: unixTimestamp): void {
    for (const animationItem of this.animationList) {
      if (animationItem.isDone(unixTimestamp)) {
        this.currentValue += animationItem.computeValuePct(1);
        this.animationList.delete(animationItem);
      };
    };
  };

  computeValueMS(unixTimestamp: unixTimestamp): propertyValue {
    let computedValue: propertyValue = this.currentValue;
    for (const animationItem of this.animationList) {
      computedValue += animationItem.computeValueMS(unixTimestamp);
    };
    return computedValue;
  };

  animate(animationOptions: animationOptions): void {
    if ('from' in animationOptions) this.cleanAnimations(animationOptions.from);
    if ('to' in animationOptions) animationOptions.offset = animationOptions.to - this.targetValue;
    this.animationList.add(new AnimationInstance(<relativeAnimationOptions>animationOptions));
  };
};

export default AnimationGroup;