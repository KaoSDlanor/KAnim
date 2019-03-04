import {milliseconds,unixTimestamp,element,propertyKey,propertyValue} from '../lib/types';
import {EasingDeclaration} from '../lib/EasingFunctions';
import ElementInstance from './ElementInstance';

export class ElementGroup {
  constructor(readonly elementList: Map<element,ElementInstance> = new Map()) {  };

  isDone(unixTimestamp: unixTimestamp): boolean {
    for (const [,elementItem] of this.elementList) {
      if (!elementItem.isDone(unixTimestamp)) return false;
    };
    return true;
  };

  ensureElement(element: element): ElementInstance {
    if (!this.elementList.has(element)) {
      const newElementItem = new ElementInstance(element);
      this.elementList.set(element,newElementItem);
      return newElementItem;
    }
    return this.elementList.get(element);
  };

  // TODO: Implement animationFrame looping

  animateTo(element: element,property: propertyKey,duration: milliseconds,to: propertyValue,easing: EasingDeclaration): void {
    return this.ensureElement(element).animateTo(property,duration,to,easing);
  };

  animateBy(element: element,property: propertyKey,duration: milliseconds,offset: propertyValue,easing: EasingDeclaration): void {
    return this.ensureElement(element).animateBy(property,duration,offset,easing);
  };
};

export default ElementGroup;