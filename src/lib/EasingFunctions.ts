// See https://gist.github.com/gre/1650294
import {percentage} from './types';

export type EasingDeclaration = "linear"
  | "easeInQuad" | "easeOutQuad" | "easeInOutQuad"
  | "easeInCubic" | "easeOutCubic" | "easeInOutCubic"
  | "easeInQuart" | "easeOutQuart" | "easeInOutQuart"
  | "easeInQuint" | "easeOutQuint" | "easeInOutQuint";

export type EasingFunction = (t: percentage) => percentage;

export type Easing = EasingFunction | EasingDeclaration;

const EasingFunctions = {

  // no easing, no acceleration
  linear: (t: percentage): percentage => t,

  // accelerating from zero velocity
  easeInQuad: (t: percentage): percentage => t*t,

  // decelerating to zero velocity
  easeOutQuad: (t: percentage): percentage => t*(2-t),

  // acceleration until halfway, then deceleration
  easeInOutQuad: (t: percentage): percentage => t<.5 ? 2*t*t : -1+(4-2*t)*t,

  // accelerating from zero velocity 
  easeInCubic: (t: percentage): percentage => t*t*t,

  // decelerating to zero velocity 
  easeOutCubic: (t: percentage): percentage => (--t)*t*t+1,

  // acceleration until halfway, then deceleration 
  easeInOutCubic: (t: percentage): percentage => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,

  // accelerating from zero velocity 
  easeInQuart: (t: percentage): percentage => t*t*t*t,

  // decelerating to zero velocity 
  easeOutQuart: (t: percentage): percentage => 1-(--t)*t*t*t,
  
  // acceleration until halfway, then deceleration
  easeInOutQuart: (t: percentage): percentage => t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t,

  // accelerating from zero velocity
  easeInQuint: (t: percentage): percentage => t*t*t*t*t,

  // decelerating to zero velocity
  easeOutQuint: (t: percentage): percentage => 1+(--t)*t*t*t*t,

  // acceleration until halfway, then deceleration 
  easeInOutQuint: (t: percentage): percentage => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t,

};

export default EasingFunctions;