# Better Base Template

**Simplifies base-template development.** Allows you to dramatically decrease amount of custom styling written per page. 

Script generates columns, margin, padding and text presets from a settings given. It also provides gulp configuration for a **faster styles compilation**.

## Features

- Generates preset* margin or padding 
- Generates Bootsrap like column system
- Generates media mixin
- Generates text formatting: preset* *font-size, font-weight...*
- **Gulp configuration with a beautiful Liner errors output**
- **Fast compilation- less than 1s**

*preset - classes, which can be used dynamically on page.

## Installing

```
git clone git@github.com:alfredsgenkins/better-base-template.git
cd better-base-template
npm install
gulp watch
```

## Notes 

If you want **Autoprefixer** and **Css Optimizer** to do their work
```
gulp --prod watch
```