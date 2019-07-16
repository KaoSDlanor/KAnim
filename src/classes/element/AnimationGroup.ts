import {unixTimestamp,percentage,elementPropertyValue,elementAnimationOptions,relativeElementAnimationOptions} from '../../lib/types';
import AnimationInstance from './AnimationInstance';

export class AnimationGroup {
  constructor(public currentValue: elementPropertyValue,readonly animationList: Set<AnimationInstance> = new Set()) { };

  get targetValue(): elementPropertyValue {
    let targetValue: elementPropertyValue = this.currentValue;
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

  clearAnimations(currentValue: elementPropertyValue): void {
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

  computeValueMS(unixTimestamp: unixTimestamp): elementPropertyValue {
    let computedValue: elementPropertyValue = this.currentValue;
    for (const animationItem of this.animationList) {
      computedValue += animationItem.computeValueMS(unixTimestamp);
    };
    return computedValue;
  };

  animate(elementAnimationOptions: elementAnimationOptions): void {
    if ('from' in elementAnimationOptions) this.cleanAnimations(elementAnimationOptions.from);
    if ('to' in elementAnimationOptions) elementAnimationOptions.offset = elementAnimationOptions.to - this.targetValue;
    this.animationList.add(new AnimationInstance(<relativeElementAnimationOptions>elementAnimationOptions));
  };
};

export default AnimationGroup;