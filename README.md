# Better Base Template

A base-template generator!

## Features

- Base template:
    - Generates preset margin or padding 
    - Generates Bootsrap like column system
    - Generates media-breakpoints mixin
    - Generates color-scheme mixin
    - Generates text formatting: preset* *font-size, font-weight...*
    - Preset base element style - **COMING SOON**
    
## Installing

1) Install npm package.

```
npm install --save-dev better-base-template
```

2) Require package and pass your configuration.

```javascript
const baseTemplate = require('better-base-template');
let options = { /** pass your options here */ };
baseTemplate.init(options);
```

3) Import generated styles in your **SCSS**


```scss
@import 'path/to/node_modules/better-base-template/src/base-template'; 
```
