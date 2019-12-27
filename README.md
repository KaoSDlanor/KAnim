# KAnim

An animation library created specifically to allow the user to have multiple animations effecting a single property simultaneously with spectacular performance - later improved to be able to animate between CSS units of measurement.

It includes typescript definition files for your convenience.

## Installation

Install with npm:

```bash
npm i @kaosdlanor/kanim
```

Include the script file in your webpage and access the global KAnim or use standard imports
```javascript
import {KAnim} from '@kaosdlanor/kanim';
```
```javascript
const {KAnim} = require('@kaosdlanor/kanim');
```

## Overview

The 2 primary methods are ```KAnim.animate(elementAnimationOptions)``` and ```KAnim.animateCSS(CSSAnimationOptions)```

```animate``` is used to change a property of any object over time. It only supports numbers

```animateCSS``` is used to change style properties of an HTMLElement. It can animate between any valid CSS ```calc()``` expressions

### Options

 - ```element``` if animating CSS then an ```HTMLElement``` otherwise any value that is not ```null``` or ```undefined```
 - ```property``` string. The key which stores the value to be animated
 - ```from``` optional, if animating CSS then a string otherwise a number. The starting value
 - ```to``` / ```offset``` if animating CSS then a string otherwise a number. The destination of the animation. Use ```offset``` for relative destinations
 - ```startTime``` optional Unix timestamp (defaults to ```+new Date()```). The time at which the animation should start
 - ```duration``` the number of milliseconds the animation should take to complete
 - ```easing``` an easing function or the name of one of the provided easing functions. see [Easing](#easing)

Both ```elementAnimationOptions``` and ```CSSAnimationOptions``` are documented further in [types.ts](./src/lib/types.ts)

### Easing

The following easing functions are provided and can be used by passing their name as the ```easing``` parameter
 - linear
 - easeInQuad
 - easeOutQuad
 - easeInOutQuad
 - easeInCubic
 - easeOutCubic
 - easeInOutCubic
 - easeInQuart
 - easeOutQuart
 - easeInOutQuart
 - easeInQuint
 - easeOutQuint
 - easeInOutQuint

If you need more control over the easing you can pass a custom easing function in

Easing functions are subject to the following rules:
 - Passed a number between 0 and 1 as the first parameter that represents the percentage of the duration that has passed
 - Returns another number that represents the transformed position in the animation
 - The returned number should match the passed number if it is either 0 or 1 but can return any number otherwise

Example:
```javascript
const bounceClamp = (t) => .5 - Math.abs(t - .5); // linear until .5 then goes back to 0 rather than 1
const bounceComponent = (t,amount) => Math.sin(bounceClamp(t) * Math.PI) * amount; // smooth to amount at 50% and then back to 0
const proceedComponent = (t) => Math.sin(Math.min(t,.5) * Math.PI); // smooth to 1 at 50% then static until 100%
const easing = (t) => proceedComponent(t) + bounceComponent(t,.25);
```
Will animate to 1.25 at 50% and then to 1 at 100%. Combine it with another easing function to alter when it reaches 1.25

See [EasingFunctions.ts](./src/lib/EasingFunctions.ts) for more examples

### Example Usage

Basic Example:
```javascript
import {KAnim} from '@kaosdlanor/kanim';

const element = document.getElementById('myAnimatable');
element.style.setProperty('outline-style','solid');

const CSSAnimationOptions = {
  element  : element          ,
  property : 'outline-width'  ,
  duration : 500              ,
  to       : '1em - 1px'      ,
  easing   : 'easeInOutQuart' ,
};

KAnim.animateCSS(CSSAnimationOptions);
```
You do not have to specify the ```from``` value because if it is not provided then it is acquired as follows
 - If no animation is in progress ```window.getComputedStyle(element).getProperty(CSSAnimationOptions.property)``` is used to generate a ```from``` value
 - If an animation is in progress then we continue to use that animation's from value and overlay your animation on top of it without disrupting the smooth motion of the element. The following will occur:
   - If you specified a ```to``` value the animation will eventually end with the element at the ```to``` value of the last animation added
   - If you specified an ```offset``` value then the offset is calculated from the current eventual resting place of the element rather than its current position

If you are animating a CSS variable or some property that the browser may not recognize then you should either set the variable before applying the animation or provide a ```from``` value

Some CSS properties do not support direct use of ```calc()``` in their values (eg. ```transform``` requires use of specific functions - not calc - but they can use calc inside their parameters)

Here is an example of using CSS variables to overcome this limitation:
```javascript
import {KAnim} from '@kaosdlanor/kanim';

const element = document.getElementById('myAnimatable');
element.style.setProperty('--tx','0px');
element.style.setProperty('transform','translateX(var(--tx))');

const CSSAnimationOptions = {
  element  : element          ,
  property : '--tx'           ,
  duration : 500              ,
  to       : '50vw - 50%'     ,
  easing   : 'easeInOutQuint' ,
};

KAnim.animateCSS(CSSAnimationOptions);
```


Animations can be chained together and combined with different units of measurement, easing functions and/or durations
```javascript
import {KAnim} from '@kaosdlanor/kanim';

const element = document.getElementById('myAnimatable');
element.style.setProperty('--tx','0px');
element.style.setProperty('transform','translateX(var(--tx))');

const delay = (t) => new Promise((resolve) => setTimeout(resolve,t));
const doAnim = async () => {
  KAnim.animateCSS({element,property:'--tx',duration:500,to:'50vw - 50%',easing:'easeInOutQuint'});
  await delay(200); // Note that this delay is shorter than the animation duration
  await KAnim.animateCSS({element,property:'--tx',duration:500,to:'20vw - 20%',easing:'easeInOutQuint'});
  console.log('Done');
};

doAnim();
```
You should avoid using ```setTimeout``` for accurate timings in your animations as it is not perfectly accurate, I am also delaying the execution of each delay call by using promises and async/await. This conveniently illustrates the fact that you can add animations to an element with KAnim without worrying about what state the element is in currently or if your timings are perfectly accurate

## Thanks

 - [Gaëtan Renaudeau](https://gist.github.com/gre) for his [Simple Easing Functions](https://gist.github.com/gre/1650294)