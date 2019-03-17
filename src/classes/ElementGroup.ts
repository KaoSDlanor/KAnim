import {unixTimestamp,element,propertyKey,propertyValue,animationOptions} from '../lib/types';
import {ElementInstance} from './ElementInstance';
import {CSSElementInstance} from './CSSElementInstance';
import {FrameLoop} from '../lib/FrameLoop';

export class ElementGroup {
  private FrameLoop: FrameLoop = new FrameLoop((): void => this.execute(+new Date()),false);

  constructor(readonly elementList: Map<element,ElementInstance> = new Map(),readonly CSSElementList: Map<element,CSSElementInstance> = new Map()) {  };

  execute(unixTimestamp: unixTimestamp): void {
    for (const [elementIdentifier,elementInstance] of this.elementList) {
      elementInstance.execute(unixTimestamp);
      if (elementInstance.isDone(unixTimestamp)) {
        this.elementList.delete(elementIdentifier);
      };
    };

    for (const [elementIdentifier,CSSElementInstance] of this.CSSElementList) {
      CSSElementInstance.execute(unixTimestamp);
      if (CSSElementInstance.isDone(unixTimestamp)) {
        this.CSSElementList.delete(elementIdentifier);
      };
    };

    if (this.isDone(unixTimestamp)) this.FrameLoop.stop();
  };

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
    };
    return this.elementList.get(element);
  };

  ensureCSSElement(element: HTMLElement): CSSElementInstance {
    if (!this.CSSElementList.has(element)) {
      const newCSSElementItem = new CSSElementInstance(element);
      this.CSSElementList.set(element,newCSSElementItem);
      return newCSSElementItem;
    };
    return this.CSSElementList.get(element);
  };

  animateCSS(animationOptions: animationOptions): void {
    if (!this.FrameLoop.status) this.FrameLoop.start();
    return this.ensureCSSElement(animationOptions.element).animate(animationOptions);
  };

  animate(animationOptions: animationOptions): void {
    if (!this.FrameLoop.status) this.FrameLoop.start();
    return this.ensureElement(animationOptions.element).animate(animationOptions);
  };
};

export default ElementGroup;