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
    
#### How mixin generation works?

- Task `base-template` is responsible for that. 

1) Read SCSS config file (`_config.scss`) with `sass-extract`.
2) Parses necessary variables, converts them into mixin's name, attributes, content.
3) Passes parsed data into function, which returns mixin string.
4) Writes string returned from function in to file using `fs` package.
5) Adds generated files to filter (so that `gulp-scss-lint`) will not check them.

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
