# KAnim

An animation library created specifically to allow the user to have multiple animations effecting a single property simultaneously with spectacular performance - later improved to be able to animate between CSS units of measurement.

It includes typescript definition files for your convenience.

## Installation

Install with npm:

```bash
npm i KAnim
```

Include the script file in your webpage and access the global KAnim or use standard imports
```javascript
import {KAnim} from 'KAnim';
```
```javascript
const {KAnim} = require('KAnim');
```

## Usage

```javascript
import {KAnim} from 'KAnim';

const element = document.getElementById('myAnimatable');
element.style.setProperty('--tx','0px');
element.style.setProperty('transform','translateX(var(--tx))');

const doAnim = async () => {
  const delay = (t) => new Promise((resolve) => setTimeout(resolve,t));
  KAnim.animateCSS({element,property:'--tx',duration:500,to:'50vw - 50%',easing:'easeInOutQuint'});
  await delay(200);
  KAnim.animateCSS({element,property:'--tx',duration:500,to:'20vw - 20%',easing:'easeInOutQuint'});
  await delay(500);
  console.log('Done');
};

doAnim();
```