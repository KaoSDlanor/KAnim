import {unixTimestamp,elementPropertyValue,elementAnimationOptions,relativeElementAnimationOptions, absoluteElementAnimationOptions} from '../../lib/types';
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

  convertAnimationType(elementAnimationOptions: absoluteElementAnimationOptions): relativeElementAnimationOptions {
    const output = <relativeElementAnimationOptions>Object.assign(
      {
        offset : elementAnimationOptions.to - this.targetValue,
        to : undefined,
      },
      elementAnimationOptions
    );

    return output;
  };

  animate(elementAnimationOptions: elementAnimationOptions): Promise<void> {
    if ('from' in elementAnimationOptions) this.cleanAnimations(elementAnimationOptions.from);
    if ('to' in elementAnimationOptions) elementAnimationOptions = this.convertAnimationType(elementAnimationOptions);
    const animation = new AnimationInstance(elementAnimationOptions);
    this.animationList.add(animation);
    return animation.done;
  };
};

export default AnimationGroup;