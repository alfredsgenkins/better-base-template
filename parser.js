'use strict';

const fs = require('fs'),
    config = require('./config');

let parser = {
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

            for (let variable in parser.options) {
                let value = parser.options[variable];

                if (typeof(value) === 'object') {
                    if (Object.keys(value).length > 0) {
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

                        if (valueParts.length > 1) {
                            value = valueParts.join(', ');
                        } else {
                            value = ''.concat(valueParts[0], ', ');
                        }
                    } else {
                        value = '[]';
                    }
                }

                variables.push(parser.scssGenerate.variable(variable, value));
            }

            fs.writeFile(config.mainPath + '_config.scss', variables.join('\n'), (err) => {
                if (err) throw err;
            });
        },
        breakpoints: () => {
            if (parser.options.enableBreakpoints) {
                let breakpoints = [];

                for (let breakpoint in parser.options.mediaBreakpoints) {
                    breakpoints.push(
                        parser.scssGenerate.mixin(
                            parser.options.mediaBreakpoints[breakpoint].alias,
                            false,
                            parser.scssGenerate.media(
                                parser.options.mediaBreakpoints[breakpoint].minWidth,
                                parser.options.mediaBreakpoints[breakpoint].maxWidth,
                                '@content;'
                            )
                        )
                    )
                }

                fs.writeFile(config.mainPath + 'mixins/generated/_media.scss', breakpoints.join('\n'), (err) => {
                    if (err) throw err;
                });
            }
        }
    }
};

module.exports = parser;