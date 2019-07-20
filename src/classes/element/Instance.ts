import {unixTimestamp,element,propertyKey,elementPropertyValue,elementAnimationOptions} from '../../lib/types';
import {AnimationGroup} from './AnimationGroup';

export class ElementInstance {
  constructor(public element: element,readonly propertyList: Map<propertyKey,AnimationGroup> = new Map()) { };

  execute(unixTimestamp: unixTimestamp): void {
    for (const [propertyKey,propertyItem] of this.propertyList) {
      propertyItem.cleanAnimations(unixTimestamp);
      this.element[propertyKey] = propertyItem.computeValueMS(unixTimestamp);
      if (propertyItem.isDone(unixTimestamp)) {
        this.propertyList.delete(propertyKey);
      };
    };
  };

  isDone(unixTimestamp: unixTimestamp): boolean {
    for (const [,propertyItem] of this.propertyList) {
      if (!propertyItem.isDone(unixTimestamp)) return false;
    };
    return true;
  };

  removeProperty({property}: elementAnimationOptions): void {
    if (this.propertyList.has(property)) {
      this.propertyList.delete(property);
    }
  };

  ensureProperty({property,from}: elementAnimationOptions): AnimationGroup {
    if (!this.propertyList.has(property)) {
      const startValue: elementPropertyValue = Number(from || this.element[property]);
      const newProperty = new AnimationGroup(startValue);
      this.propertyList.set(property,newProperty);
      return newProperty;
    };
    return this.propertyList.get(property);
  };

  animate(elementAnimationOptions: elementAnimationOptions): void {
    if (elementAnimationOptions.from) this.removeProperty(elementAnimationOptions);
    return this.ensureProperty(elementAnimationOptions).animate(elementAnimationOptions);
  };
};

export default ElementInstance;