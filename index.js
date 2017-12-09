'use strict';

const config = require('./config.js'),
    fs = require('fs');

let betterBaseTempate = {
    options: {},
    scssGenerate: {
        mixin: (name, params, content) => {
            return '@mixin'.concat(' ', name, ((params) ? ''.concat(' (', params.join(', '), ')') : ''), ' {', content, '}');
        },
        media: (minWidth, maxWidth, content) => {
            return '@media'.concat(' ', ((minWidth !== 'null') ? ''.concat('(min-width: ', minWidth, ')') : ''), ((minWidth !== 'null' && maxWidth !== 'null') ? 'and' : ''), ((maxWidth !== 'null') ? ''.concat('(max-width: ', maxWidth, ')') : ''), '{', content, '}');
        },
        variable: (name, value) => {
            return '$'.concat(!name ? null : name.replace(/([A-Z])/g, function (g) { return '-' + g[0].toLowerCase() }), ': ', value, ';');
        }
    },
    parseConfig: {
        variables: () => {
            let variables = [];

            for (let variable in betterBaseTempate.options) {
                let value = betterBaseTempate.options[variable];

                if (typeof(value) === 'object') {
                    let valueParts = [];

                    for (let valuePart in value) {
                        let valuePartString = '';

                        if (typeof(value[valuePart]) === 'object') {
                            valuePartString = valuePartString.concat(Object.values(value[valuePart]).join(' '));
                        } else {
                            valuePartString = value[valuePart];
                        }

                        valueParts.push(valuePartString);
                    }

                    value = valueParts.join(', ');
                }

                variables.push(betterBaseTempate.scssGenerate.variable(variable, value));
            }

            fs.writeFile(config.mainPath + '_config.scss', variables.join('\n'), (err) => {
                if (err) throw err;
            });
        },
        breakpoints: () => {
            if (betterBaseTempate.options.enableBreakpoints) {
                let breakpoints = [];

                for (let breakpoint in betterBaseTempate.options.mediaBreakpoints) {
                    breakpoints.push(
                        betterBaseTempate.scssGenerate.mixin(
                            betterBaseTempate.options.mediaBreakpoints[breakpoint].alias,
                            false,
                            betterBaseTempate.scssGenerate.media(
                                betterBaseTempate.options.mediaBreakpoints[breakpoint].minWidth,
                                betterBaseTempate.options.mediaBreakpoints[breakpoint].maxWidth,
                                '@content;'
                            )
                        )
                    )
                }

                fs.writeFile(config.mainPath + 'mixins/_media-generated.scss', breakpoints.join('\n'), (err) => {
                    if (err) throw err;
                });
            }
        }
    },
    init: (options) => {
        betterBaseTempate.options = Object.assign({}, options, config.options);

        betterBaseTempate.parseConfig.variables();
        betterBaseTempate.parseConfig.breakpoints();
    }
};

betterBaseTempate.init();

module.exports = betterBaseTempate;