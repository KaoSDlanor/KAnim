import {unixTimestamp,propertyKey,propertyValue} from '../lib/types';
import {ElementInstance} from './ElementInstance';
import {AnimationGroup} from './AnimationGroup';

export class CSSElementInstance extends ElementInstance {
  execute(unixTimestamp: unixTimestamp): void {
    for (const [propertyKey,propertyItem] of this.propertyList) {
      propertyItem.cleanAnimations(unixTimestamp);
      this.element.style.setProperty(propertyKey,String(propertyItem.computeValueMS(unixTimestamp)));
      if (propertyItem.isDone(unixTimestamp)) {
        this.propertyList.delete(propertyKey);
      };
    };
  };

  ensureProperty(property: propertyKey): AnimationGroup {
    if (!this.propertyList.has(property)) {
      const startValue: propertyValue = Number(this.element.style.getPropertyValue(property));
      const newProperty = new AnimationGroup(startValue);
      this.propertyList.set(property,newProperty);
      return newProperty;
    };
    return this.propertyList.get(property);
  };
};

export default CSSElementInstance;