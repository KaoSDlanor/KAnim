import {milliseconds,unixTimestamp,propertyValue} from '../lib/types';
import {EasingDeclaration} from '../lib/EasingFunctions';
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

  animateTo(duration: milliseconds,to: propertyValue,easing: EasingDeclaration): void {
    return this.animateBy(duration,to - this.targetValue,easing);
  };

  animateBy(duration: milliseconds,offset: propertyValue,easing: EasingDeclaration): void {
    this.animationList.add(new AnimationInstance(duration,offset,easing));
  };
};

export default AnimationGroup;