# Better Base Template

A base-template generator with awesome gulp configuration!

## Features

- Base template:
    - Generates preset margin or padding 
    - Generates Bootsrap like column system
    - Generates media-breakpoints mixin
    - Generates color-scheme mixin
    - Generates text formatting: preset* *font-size, font-weight...*
- Gulp configuration:
    - Beautiful Liner errors output
    - Fast compilation (scss + linter tasks in less than 1s)
    - Basic plugins included (`browser-sync`, `gulp-sourcemaps`)
    - Application environment support (development and production)

#### How fast compilation process is achieved?

1) Gulp starts compiling all files in source folder
2) File existence in cache is checked by `gulp-cached`:
   1) If already exist and was changed: `gulp-better-sass-inheritance` checks file dependencies and compiles the sequence of files.
3) File is being checked by `gulp-scss-lint` (linter):
    1) If file is OK it is being cached.
    2) If file contains issues, it is being removed from cache and passed to a **custom issue reporter**, which is made more awesome by `gulp-color`.

#### How mixin generation works?

- Task `base-template` is responsible for that. 

1) Read SCSS config file (`_config.scss`) with `sass-extract`.
2) Parses necessary variables, converts them into mixin's name, attributes, content.
3) Passes parsed data into function, which returns mixin string.
4) Writes string returned from function in to file using `fs` package.
5) Adds generated files to filter (so that `gulp-scss-lint`) will not check them.

## Installing

```
git clone git@github.com:alfredsgenkins/better-base-template.git
cd better-base-template
npm install
gulp watch
```

#### How to change an application environment?

> If you want **Autoprefixer** and **Css Minifier** to work (they do in **production** mode only): `gulp --mode=prod`

## Usage

#### Text-formatting, Margin-padding?

- If you have no preset values for the element, you should not extend this element with a functionality of mixin.

```css
button {
    /** 
     *  note: element is not extended by %mp (margin-padding)
     */
      
    background-color: $c-primary;
}
```

```css
button {
    @extend %mp;
    
    /** 
     *  note: element is extended by %mp (margin-padding), 
     *  because it has a preset value which should be overwritten.
     */
    
    background-color: $c-primary;
    padding: 10px 5px;
}
```

#### Media breakpoints?

```css
a {  
    /** 
     *  note: you can quickly set element properties in media-breakpoint scope.
     */
    
    font-size: 12px;
    
    @include mobile {
        font-size: 14px;
    }
}
```

#### Color schemes?

```css
a {  
    /** 
     *  note: you can quickly set element properties in color-scheme,
     *  gulp will generate a.primary { color: red; }.
     */
    
    color: $fc-default;
    
    @include primary {
        color: $fc-primary;
    }
}
```
