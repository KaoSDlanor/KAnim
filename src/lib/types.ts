import {EasingFunction,EasingDeclaration} from './EasingFunctions';

export type milliseconds = number;
export type unixTimestamp = milliseconds;
export type percentage = number;

export type element = HTMLElement;
export type propertyKey = string;
export type elementPropertyValue = number;
export type CSSPropertyValue = string;

export interface baseAnimationOptions {
  element    : element | any,
  property   : propertyKey,
  startTime? : unixTimestamp,
  duration   : milliseconds,
  easing     : EasingFunction | EasingDeclaration,
}

export interface baseElementAnimationOptions extends baseAnimationOptions {
  from?      : elementPropertyValue,
  min?       : elementPropertyValue,
  max?       : elementPropertyValue,
};

export interface relativeElementAnimationOptions extends baseElementAnimationOptions {
  offset     : elementPropertyValue,
};

export interface absoluteElementAnimationOptions extends baseElementAnimationOptions {
  to         : elementPropertyValue,
};

export type elementAnimationOptions = relativeElementAnimationOptions | absoluteElementAnimationOptions;

export interface baseCSSAnimationOptions extends baseAnimationOptions {
  element    : element,
  from?      : CSSPropertyValue,
};

export interface relativeCSSAnimationOptions extends baseCSSAnimationOptions {
  offset     : CSSPropertyValue,
};

export interface absoluteCSSAnimationOptions extends baseCSSAnimationOptions {
  to         : CSSPropertyValue,
};

export type CSSAnimationOptions = relativeCSSAnimationOptions | absoluteCSSAnimationOptions;