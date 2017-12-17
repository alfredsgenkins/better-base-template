'use strict';

const config = require('./config'),
    parser = require('./parser');

let betterBaseTempate = {
    init: (options) => {
        parser.options = Object.assign({}, config.options, options);

        parser.parseConfig.variables();
        parser.parseConfig.breakpoints();
    }
};

module.exports = betterBaseTempate;