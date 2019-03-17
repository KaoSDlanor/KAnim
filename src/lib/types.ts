import {EasingFunction,EasingDeclaration} from './EasingFunctions';

export type milliseconds = number;
export type unixTimestamp = milliseconds;
export type percentage = number;

export type element = HTMLElement;
export type propertyKey = string;
export type propertyValue = number;

export interface baseAnimationOptions {
  element    : element,
  property   : propertyKey,
  startTime? : unixTimestamp,
  duration   : milliseconds,
  offset?    : propertyValue,
  to?        : propertyValue,
  from?      : propertyValue,
  easing     : EasingFunction | EasingDeclaration,
};

export interface relativeAnimationOptions extends baseAnimationOptions {
  offset     : propertyValue,
};

export interface absoluteAnimationOptions extends baseAnimationOptions {
  to         : propertyValue,
};

export type animationOptions = relativeAnimationOptions | absoluteAnimationOptions;