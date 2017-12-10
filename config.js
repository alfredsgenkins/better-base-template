module.exports = {
    options: {
        enableBreakpoints: true,
        mediaBreakpoints: [
            {
                prefix: 'm',
                alias: 'mobile',
                minWidth: 'null',
                maxWidth: '1023px'
            }, {
                prefix: 'd',
                alias: 'desktop',
                minWidth: '1024px',
                maxWidth: 'null'
            }
        ],
        enableColumns: true,
        columnGaps: true,
        columnCount: true,
        customColumns: [
            {
                alias: 'one-fifth',
                width: '20%'
            }
        ],
        columnBreakpoints: true,
        enableMp: false,
        mpSizes: [
            {
                alias: 'none',
                size: 0
            },
            {
                alias: 'xs',
                size: '3px'
            },
            {
                alias: 's',
                size: '5px'
            },
            {
                alias: 'm',
                size: '10px'
            },
            {
                alias: 'l',
                size: '15px'
            },
            {
                alias: 'xl',
                size: '20px'
            },
            {
                alias: '2xl',
                size: '25px'
            },
            {
                alias: '3xl',
                size: '30px'
            },
            {
                alias: '4xl',
                size: '35px'
            },
            {
                alias: '5xl',
                size: '40px'
            },
            {
                alias: '6xl',
                size: '45px'
            },
            {
                alias: '7xl',
                size: '50px'
            },
            {
                alias: 'huge',
                size: '80px'
            }
        ],
        mpVerticalHorizontal: true,
        mpBreakpoints: true,
        enableTf: false,
        tfFontFaces: false,
        tfEnableFontFamilyAlias: true,
        tfFontFamilyAliases: false,
        tfFontFamilyAliasBreakpoints: true,
        tfEnableFontSize: true,
        tfFontSizes: [
            {
                alias: 'xs',
                size: '8px'
            },
            {
                alias: 's',
                size: '10px'
            },
            {
                alias: 'm',
                size: '12px'
            },
            {
                alias: 'l',
                size: '15px'
            },
            {
                alias: 'xl',
                size: '18px'
            },
            {
                alias: '2xl',
                size: '20px'
            },
            {
                alias: '3xl',
                size: '25px'
            },
            {
                alias: '4xl',
                size: '30px'
            },
            {
                alias: '5xl',
                size: '35px'
            }
        ],
        tfFontSizeBreakpoints: true,
        tfEnableFontSizeResponsive: true,
        tfFontSizeResponsiveBreakpoints: 'mobile',
        tfEnableFontWeight: true,
        tfFontWeights: [
            {
                alias: 'bold',
                weight: 700
            },
            {
                alias: 'semibold',
                weight: 600
            },
            {
                alias: 'light',
                weight: 300
            },
        ],
        tfFontWeightBreakpoints: true,
        tfEnableFontColor: true,
        tfFontColors: false,
        tfFontColorBreakpoints: false,
        tfEnableLineHeight: true,
        tfLineHeights: [
            {
                alias: 'xs',
                lineHeight: 1
            },
            {
                alias: 's',
                lineHeight: 1.21
            },
            {
                alias: 'm',
                lineHeight: 1.4
            },
            {
                alias: 'l',
                lineHeight: 1.81
            },
            {
                alias: 'xl',
                lineHeight: 2.16
            }
        ],
        tfEnableTransform: true,
        tfTransforms: [
            {
                alias: 'up',
                transform: 'uppercase'
            },
            {
                alias: 'low',
                transform: 'lowercase'
            }
        ],
        tfTransformsBreakpoints: false
    },
    mainPath: __dirname + '/src/core/'
};

