'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    runSequence = require('run-sequence'),
    gulpif = require('gulp-if'),
    autoprefixer = require('gulp-autoprefixer'),
    config = require('./config.json'),
    sassInheritance = require('gulp-better-sass-inheritance'),
    args = require('get-gulp-args')(),
    cached = require('gulp-cached'),
    csso = require('gulp-csso'),
    scsslint = require('gulp-scss-lint'),
    color = require('gulp-color'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    gulpFilter = require('gulp-filter'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber');

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

gulp.task('watch', function(callback){
    runSequence(config.tasks.list, callback);
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
    runSequence(config.tasks.default)
});

gulp.task('scss', function() {
    let scssFilter = gulpFilter(linterIgnored, {restore: true});

    return gulp.src(config.scss.src + config.scss.filemask)
        .pipe(gulpif(global.isWatching, cached('scss')))
        .pipe(sassInheritance({base: config.scss.src}))
        .pipe(scssFilter)
        .pipe(scsslint(config.linter))
        .pipe(scssFilter.restore)
        .pipe(plumber({ errorHandler: function(err) {
                notify.onError({
                    title: "Gulp error in " + err.plugin,
                    message:  err.toString()
                })(err);
            }}))
        .pipe(gulpif(process.env.NODE_ENV === 'dev', sourcemaps.init()))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulpif(process.env.NODE_ENV === 'dev', sourcemaps.write()))
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