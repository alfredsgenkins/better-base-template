# Documentation

## Table of contents

- [Installation](#installation)
- [Configuration](#configuration)
    - [Media Breakpoints](#media-breakpoints)
    - [Row & Column layout](#row--column-layout)
    - [Margin & Padding preset](#margin--padding-preset)
    - [Font Formatting preset](#font-formatting-preset)
    
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
    
- `tfEnableFontSize`
    - **Type** - `boolean`
    - **Default value** - `true`
    - **Description** - Switch for enabling font-size preset.
    
- `tfFontSizes`
    - **Type** - two-dimensional `array`
    - **Default value** - `[['xs', '8px'], ['s', '10px'], ['m', '12px'], ['l', '15px'], ['xl', '18px'], ['2xl', '20px'], ['3xl', '25px'], ['4xl', '30px'], ['5xl', '35px']]`
    - **Template** - `[[font-size alias, font-size], [...]]`
    - **Description** - List of font-sizes and it's aliases.
    - **Example** - `<div class="fs-[alias]">`, `fs-` + alias name!
    
- `tfFontSizeBreakpoints`
    - **Type** - `boolean`
    - **Default value** - `true`
    - **Description** - Switch for enabling and disabling font-size aliases functionality in scope of media breakpoints.
    - **Example** - `<div class="m-fs-curved">`, media breakpoint prefix + `-` +  font-size alias
    
- `tfEnableFontSizeResponsive`
    - **Type** - `boolean`
    - **Default value** - `true`
    - **Description** - Switch for enabling responsiveness of the font-size.
    
- `tfFontSizeResponsiveBreakpoints`
    - **Type** - `array`
    - **Default value** - `['mobile']`
    - **Template** - `[media breakpoint alias, ... ]`
    - **Description** - List of breakpoints, where font-size should be relative.

- `tfEnableFontWeight`
    - **Type** - `boolean`
    - **Default value** - `true`
    - **Description** - Switch for enabling font-weight preset.
    
- `tfFontWeights`
    - **Type** - two-dimensional `array`
    - **Default value** - `[['bold', '700'], ['semibold', 600], ['light', 300]]`
    - **Template** - `[[font-weight alias, font-weight], [...]]`
    - **Description** - List of font-weights and it's aliases.
    - **Example** - `<div class="fw-[alias]">`, `fw-` + alias name!

- `tfFontWeightBreakpoints`
    - **Type** - `boolean`
    - **Default value** - `true`
    - **Description** - Switch for enabling and disabling font-weight aliases functionality in scope of media breakpoints.
    - **Example** - `<div class="m-fw-curved">`, media breakpoint prefix + `-` +  font-weight alias

- `tfEnableFontColor`
    - **Type** - `boolean`
    - **Default value** - `true`
    - **Description** - Switch for enabling text color preset.
    
- `tfFontColors`
    - **Type** - two-dimensional `array`
    - **Default value** - `false`
    - **Template** - `[[text color alias, color], [...]]`
    - **Description** - List of text colors and it's aliases.
    - **Example** - `<div class="fc-[alias]">`, `fc-` + alias name!
    
- `tfFontColorBreakpoints`
    - **Type** - `boolean`
    - **Default value** - `false`
    - **Description** - Switch for enabling and disabling text color aliases functionality in scope of media breakpoints.
    - **Example** - `<div class="m-fc-curved">`, media breakpoint prefix + `-` +  text color alias

- `tfEnableLineHeight`
    - **Type** - `boolean`
    - **Default value** - `true`
    - **Description** - Switch for enabling line-height preset.
    
- `tfLineHeights`
    - **Type** - two-dimensional `array`
    - **Default value** - `[['xs', '1'], ['s', '1.21'], ['m', '1.4'], ['l', '1.81'], ['xl', '2.16']]`
    - **Template** - `[[line-height alias, line-height], [...]]`
    - **Description** - List of line-heights and it's aliases.
    - **Example** - `<div class="flh-[alias]">`, `flh-` + alias name!
    
**DOCUMENTATION IS IN PROGRESS**...

<sup>*</sup> TF - Text Formatting
