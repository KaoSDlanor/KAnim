import {EasingFunction,EasingDeclaration} from './EasingFunctions';

export type milliseconds = number;
export type unixTimestamp = milliseconds;
export type percentage = number;

export type element = HTMLElement;
export type propertyKey = string;
export type elementPropertyValue = number;
export type CSSPropertyValue = string;

export interface baseElementAnimationOptions {
  element    : element,
  property   : propertyKey,
  startTime? : unixTimestamp,
  duration   : milliseconds,
  offset?    : elementPropertyValue,
  to?        : elementPropertyValue,
  from?      : elementPropertyValue,
  easing     : EasingFunction | EasingDeclaration,
};

export interface relativeElementAnimationOptions extends baseElementAnimationOptions {
  offset     : elementPropertyValue,
};

export interface absoluteElementAnimationOptions extends baseElementAnimationOptions {
  to         : elementPropertyValue,
};

export type elementAnimationOptions = relativeElementAnimationOptions | absoluteElementAnimationOptions;

export interface baseCSSAnimationOptions {
  element    : element,
  property   : propertyKey,
  startTime? : unixTimestamp,
  duration   : milliseconds,
  offset?    : CSSPropertyValue,
  to?        : CSSPropertyValue,
  from?      : CSSPropertyValue,
  easing     : EasingFunction | EasingDeclaration,
};

export interface relativeCSSAnimationOptions extends baseCSSAnimationOptions {
  offset     : CSSPropertyValue,
};

export interface absoluteCSSAnimationOptions extends baseCSSAnimationOptions {
  to         : CSSPropertyValue,
};

export type CSSAnimationOptions = relativeCSSAnimationOptions | absoluteCSSAnimationOptions;