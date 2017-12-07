const gulp = require('gulp'),
    sass = require('gulp-sass'),
    runSequence = require('run-sequence'),
    gulpif = require('gulp-if'),
    autoprefixer = require('gulp-autoprefixer'),
    header = require('gulp-header'),
    pkg = require('./package.json'),
    config = require('./config.json'),
    sassInheritance = require('gulp-better-sass-inheritance'),
    args = require('get-gulp-args')(),
    cached = require('gulp-cached'),
    csso = require('gulp-csso'),
    scsslint = require('gulp-scss-lint'),
    color = require('gulp-color'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    sassExtract = require('sass-extract'),
    fs = require('fs'),
    gulpFilter = require('gulp-filter');

let linterIgnored = [];

process.env.NODE_ENV = args.mode || 'dev';

config.linter.customReport = function (file) {
    if (!file.scsslint.success) {
        if (file.scsslint.warnings) {
            console.log(color('WARNING', 'RED') + ': There ' + (file.scsslint.warnings > 1 ? 'are ' : 'is ') + color(file.scsslint.warnings, 'CYAN') + ' ' + (file.scsslint.warnings > 1 ? 'issues' : 'issue') + ' in ' + color(file.path, 'MAGENTA'));
            for (let i = 0; i < file.scsslint.issues.length; i++) {
                console.log('    ' + (i + 1) + ') issue on line: ' + color(file.scsslint.issues[i].line, 'CYAN') + ', reason: ' +  color(file.scsslint.issues[i].reason, 'MAGENTA'));
            }
        }

        delete cached.caches.scss[file.path];
    }
};

gulp.task('base-template', function () {
    let mixinPath = './' + config.scss.src + 'base-template/components/mixins/';

    sassExtract.render({
        file: './assets/scss/base-template/core/_config.scss'
    }).then(rendered => {
        let scssVars = rendered.vars.global;
        let scssGenerate = {
            mixin: function (name, params, content) {
                return '@mixin ' + name + ((params) ? ' (' + params.join(', ') + ')' : '') + ' {' + content + '}';
            },
            media: function (minWidth, maxWidth, content) {
                return '@media ' + ((minWidth) ? '(min-width: ' + minWidth + ')' : '') + ((minWidth && maxWidth) ? 'and' : '') + ((maxWidth) ? '(max-width: ' + maxWidth + ')' : '') + '{' + content + '}';
            },
            size: function (size, units) {
                return size + units;
            }
        };

        if (scssVars['$enable-breakpoints'].value) {
            let mediaMixins = [],
                mediaPath = mixinPath + '_media.scss';

            scssVars['$media-breakpoints'].value.forEach(function (breakpoint) {
                mediaMixins.push(
                    scssGenerate.mixin(
                        breakpoint.value[1].value,
                        false,
                        scssGenerate.media(
                            scssGenerate.size(
                                breakpoint.value[2].value,
                                breakpoint.value[2].unit
                            ),
                            scssGenerate.size(
                                breakpoint.value[3].value,
                                breakpoint.value[3].unit
                            ),
                            '@content;'
                        )
                    )
                );
            });

            fs.writeFile(mediaPath, mediaMixins.join('\n'), (err) => {
                if (err) throw err;
            });
            linterIgnored.push(mediaPath);
        }

        if (scssVars['$enable-color-scheme'].value) {
            let colorMixins = [],
                colorPath = mixinPath + '_color.scss';

            scssVars['$color-schemes'].value.forEach(function (color) {
                colorMixins.push(
                    scssGenerate.mixin(
                        color.value,
                        false,
                        '@content;'
                    )
                );
            });

            fs.writeFile(colorPath, colorMixins.join('\n'), (err) => {
                if (err) throw err;
            });
            linterIgnored.push(colorPath);
        }
    });
});

gulp.task('watch', function(callback){
    runSequence('base-template', config.tasks.list, callback);
    global.isWatching = true;
    gulp.watch(
        config.scss.src + config.scss.filemask,
        {
            outputStyle: process.env.NODE_ENV === 'dev' ? 'expanded' : 'compressed'
        },
        function() {
            return runSequence(config.tasks.list);
        }
    );
});

gulp.task('default', function () {
    runSequence('base-template', config.tasks.default)
});

gulp.task('scss', function() {
    let scssFilter = gulpFilter(linterIgnored, {restore: true});

    return gulp.src(config.scss.src + config.scss.filemask)
        .pipe(gulpif(global.isWatching, cached('scss')))
        .pipe(sassInheritance({base: config.scss.src}))
        .pipe(scssFilter)
        .pipe(scsslint(config.linter))
        .pipe(scssFilter.restore)
        .pipe(gulpif(process.env.NODE_ENV === 'dev', sourcemaps.init()))
        .pipe(sass())
        .pipe(gulpif(process.env.NODE_ENV === 'dev', sourcemaps.write()))
        .pipe(header(config.banner.join('\n').concat('\n\n'),{pkg:pkg}))
        .pipe(gulpif(process.env.NODE_ENV === 'prod', csso()))
        .pipe(gulpif(process.env.NODE_ENV === 'prod', autoprefixer(config.autoprefixer)))
        .pipe(gulp.dest(config.scss.dest))
});

gulp.task('browser-sync', function () {
    if (config.browserSync.proxy !== 'your.domain') {
        if (process.env.NODE_ENV === 'dev') {
            browserSync.init(config.browserSync);
        }
    } else {
        console.log(color('WARNING', 'RED') + ": Please specify your domain to use '" + color('browser-sync', 'MAGENTA') + "'");
    }
});