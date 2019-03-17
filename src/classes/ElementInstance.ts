import {unixTimestamp,element,propertyKey,propertyValue,animationOptions} from '../lib/types';
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

  ensureProperty(property: propertyKey): AnimationGroup {
    if (!this.propertyList.has(property)) {
      const startValue: propertyValue = this.element[property];
      const newProperty = new AnimationGroup(startValue);
      this.propertyList.set(property,newProperty);
      return newProperty;
    };
    return this.propertyList.get(property);
  };

  animate(animationOptions: animationOptions): void {
    return this.ensureProperty(animationOptions.property).animate(animationOptions);
  };
};

export default ElementInstance;