# Documentation for `Better Base Template 1.0.4`

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

## Media breakpoints

**Functionality**:
1) Generates SCSS mixins for each media breakpoint scope.
2) Allows other components to change depending on MB scope.

**Example of usage**:

```scss
@include mobile { /** content in mobile MB scope */ }
@include media(mobile) { /** this one is working as well */ }
```

**Options**

- `enableBreakpoints`
    - **Type** - `boolean`
    - **Default value** - `true`
    
- `mediaBreakpoints`
    - **Type** - two-dimensional `array`
    - **Template** - `{[MB prefix, MB alias, MB min-width, MB max-width],[...]}`
    - **Default value** - 
        
    ```javascript
    [
        {
            prefix: 'm',
            alias: 'mobile',
            minWidth: 'null',
            maxWidth: '1023px'
        }, 
        {
            prefix: 'd',
            alias: 'desktop',
            minWidth: '1024px',
            maxWidth: 'null'
        }
    ]
    ```


    
