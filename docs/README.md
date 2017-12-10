# `Better Base Template` documentation

This guide is for `better-base-template` version `1.0.3`!

## Installation
 
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

