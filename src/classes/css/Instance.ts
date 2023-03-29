import {unixTimestamp,element,propertyKey,CSSPropertyValue,CSSAnimationOptions} from '../../lib/types';
import {AnimationGroup} from './AnimationGroup';

export class CSSElementInstance {
  constructor(public element: element,readonly propertyList: Map<propertyKey,AnimationGroup> = new Map()) { };

  execute(unixTimestamp: unixTimestamp): void {
    for (const [propertyKey,propertyItem] of this.propertyList) {
      propertyItem.cleanAnimations(unixTimestamp);
      this.element.style.setProperty(propertyKey,String(propertyItem.computeValueMS(unixTimestamp)));
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

  removeProperty({property}: CSSAnimationOptions): void {
    if (this.propertyList.has(property)) {
      this.propertyList.delete(property);
    }
  };

  ensureProperty({property,from}: CSSAnimationOptions): AnimationGroup {
    if (!this.propertyList.has(property)) {
      const startValue: CSSPropertyValue = String(from || window.getComputedStyle(this.element).getPropertyValue(property));
      const newProperty = new AnimationGroup(startValue);
      this.propertyList.set(property,newProperty);
      return newProperty;
    }
    return this.propertyList.get(property)!;
  };

  animate(CSSAnimationOptions: CSSAnimationOptions): Promise<void> {
    if (CSSAnimationOptions.from) this.removeProperty(CSSAnimationOptions);
    return this.ensureProperty(CSSAnimationOptions).animate(CSSAnimationOptions);
  };
};

export default CSSElementInstance;