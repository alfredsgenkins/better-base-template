# Documentation for `Better Base Template 1.0.4`

## Table of content

- [Installation](#installation)
- [Configuration](#configuration)
    - [Media Breakpoints](#media-breakpoints)

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

## Configuration

### Media breakpoints

#### Functionality

1) Generates SCSS mixins for each media breakpoint scope.
2) Allows other components to change depending on MB* scope.

#### Example of usage

```scss
@include mobile { /** content in mobile MB scope */ }
@include media(mobile) { /** this one is working as well */ }
```

#### Options

- `enableBreakpoints`
    - **Type** - `boolean`
    - **Default value** - `true`
    - **Description** - Switch for enabling and disabling MB* functionality.
    
- `mediaBreakpoints`
    - **Type** - two-dimensional `array`
    - **Template** - `[[MB* prefix, MB* alias, MB* min-width, MB* max-width],[...]]`
    - **Default value** - `[['m', 'mobile', 'null', '1023px'], ['d', 'desktop', '1024px', 'null']]`
    - **Description** - List of breakpoints to generate.
    
<sup>*</sup> MB - Media Breakpoint

### Row & Column layout

#### Functionality

1) Generates HTML classes for building column based layout.

#### Example of usage

```html
<div class="row">
    <div class="col-6 gap-6">
        <!-- Content of this element will take 50% of available space on the right --->
    </div>
    <div class="m-col-6 d-col-3">
        <!-- Element will take 25% of space on desktop, and 50% on mobile --->
    </div>
</div> 
```

#### Options

- `enableColumns`
    - **Type** - `boolean`
    - **Default value** - `true`
    - **Description** - Switch for enabling and disabling CL* functionality.
    - **Example** - `<div class="col-12">`, `col` + `-` +  column size
    
- `columnGaps`
    - **Type** - `boolean`
    - **Default value** - `true`
    - **Description** - Switch for enabling and disabling CL* gaps functionality.
    - **Example** - `<div class="gap-4">`, `gap` + `-` +  gap size
    
- `columnCount`
    - **Type** - `integer`
    - **Default value** - `12`
    - **Description** - Number of columns in one row.
    
- `customColumns`
    - **Type** - two-dimensional `array`
    - **Template** - `[[column alias, column width],[...]]`
    - **Default value** - `[['one-fifth', '20%']]`
    - **Description** - List of custom columns to generate. 

- `columnBreakpoints`
    - **Type** - `boolean`
    - **Default value** - `true`
    - **Description** - Switch for enabling and disabling CL* functionality in scope of media breakpoints.
    - **Example** - `<div class="m-col-4">`, media breakpoint prefix + `-` +  column or gap

<sup>*</sup> CL - Column Layout

### Margin & Padding preset

#### Functionality

1) Generates HTML classes for quick element alignment.

#### Example of usage

If the [specificity value](https://css-tricks.com/specifics-on-css-specificity/#article-header-id-0) of the element is less than `0,0,1,0`, you should not extend it with `%mp`. If greater, `%mp` extension is obligatory.

```scss
.class {
    @extend %mp;
}

p {
    /** %mp extension is not needed, while value is less then `0,0,1,0` */
}
```

```html
<h2>Random heading here</h2>
<p class="margin-top-m">
    <!-- This text is much aligned a bit further down, 
        than default, because class 'margin-top-m' is applied. -->
</p>
```

#### Options

- `enableMp`
    - **Type** - `boolean`
    - **Default value** - `false`
    - **Description** - Switch for enabling and disabling MP* functionality.
    
- `mpSizes`
    - **Type** - two-dimensional `array`
    - **Template** - `[[MP* alias, MP* size],[...]]`
    - **Default value** - `[['none', '0'], ['xs', '3px'], ['xs', '3px'], ['s', '5px'], ['m', '10px'], ['l', '15px'], ['xl', '20px'], ['2xl', '25px'], ['3xl', '30px'], ['4xl', '35px'], ['5xl', '40px'], ['6xl', '45px'], ['7xl', '50px'], ['huge', '80px']]`
    - **Description** - List of MP* to generate.
    - **Example** - `<div class="padding-left-xl"> ... </div>`, (`padding` or `margin`) + `-` +  direction + `-` + size
    
- `mpVerticalHorizontal`
    - **Type** - `boolean`
    - **Default value** - `true`
    - **Description** - Switch for enabling and disabling vertical and horizontal MP* functionality.
    - **Example** - `<div class="padding-vertical-xl"> ... </div>`
    
- `mpBreakpoints`
    - **Type** - `boolean`
    - **Default value** - `true`
    - **Description** - Switch for enabling and disabling MP* functionality in scope of media breakpoints.
    - **Example** - `<div class="m-padding-vertical-xl">`, media breakpoint prefix + `-` +  margin or padding

<sup>*</sup> MP - Margin & Padding

### Font Formatting preset

#### Functionality

1) Generates HTML classes for quick text formatting.

#### Example of usage

If the [specificity value](https://css-tricks.com/specifics-on-css-specificity/#article-header-id-0) of the element is less than `0,0,1,0`, you should not extend it with `%tf`. If greater, `%tf` extension is obligatory.

```scss
.class {
    @extend %tf;
}

p {
    /** %tf extension is not needed, while value is less then `0,0,1,0` */
}
```

```html
<p class="ff-curved fs-xl"> 
    <!-- This text is using font-face with alias 'curved',
        as well as font-size with alias 'xl'. --> 
</h2>
```
#### Options

- `enableTf`
    - **Type** - `boolean`
    - **Default value** - `false`
    - **Description** - Switch for enabling and disabling TF* functionality.

- `tfFontFaces`
    - **Type** - two-dimensional `array`
    - **Default value** - `false`
    - **Template** - `[[font-family, path to font, font-weight - optional, font-style - optional], [...]]`
    - **Description** - List for generating font-faces.

- `tfEnableFontFamilyAlias`
    - **Type** - `boolean`
    - **Default value** - `true`
    - **Description** - Switch for enabling font-family preset.

- `tfFontFamilyAliases`
    - **Type** - two-dimensional `array`
    - **Default value** - `false`
    - **Template** - `[[font-family, alias], [...]]`
    - **Description** - List of font-family and it's aliases.
    - **Example** - `<div class="ff-[alias]">`, `ff-` + alias name!
    
- `tfFontFamilyAliasBreakpoints`
    - **Type** - `boolean`
    - **Default value** - `true`
    - **Description** - Switch for enabling and disabling font-family aliases functionality in scope of media breakpoints.
    - **Example** - `<div class="m-ff-curved">`, media breakpoint prefix + `-` +  font-family alias
    
**DOCUMENTATION IS IN PROGRESS**...

<sup>*</sup> TF - Text Formatting
