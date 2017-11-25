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
    color = require('gulp-color');

process.env.NODE_ENV = args.prod ? 'prod' : 'dev';
config.linter.customReport = function (file) {
    if (!file.scsslint.success) {
        if (file.scsslint.warnings) {
            console.log(color('WARNING', 'RED') + ': There ' + (file.scsslint.warnings > 1 ? 'are ' : 'is ') + file.scsslint.warnings + ' ' + (file.scsslint.warnings > 1 ? 'issues' : 'issue') + ' in ' + file.path);
            for (var i = 0; i < file.scsslint.issues.length; i++) {
                console.log('    ' + (i + 1) + ') issue on line: ' + file.scsslint.issues[i].line + ', reason: ' + file.scsslint.issues[i].reason);
            }
        }

        delete cached.caches.scss[file.path];
    }
};

gulp.task('watch', function(callback){
    runSequence('scss', callback);
    global.isWatching = true;
    gulp.watch('assets/scss/**/*.scss', ['scss']);
});

gulp.task('scss', function() {
    return gulp.src('assets/scss/**/*.scss')
        .pipe(gulpif(global.isWatching, cached('scss')))
        .pipe(sassInheritance({base: 'assets/scss/'}))
        .pipe(scsslint(config.linter))
        .pipe(sass())
        .pipe(header(config.banner.join('\n').concat('\n\n'),{pkg:pkg}))
        .pipe(gulpif(process.env.NODE_ENV === 'prod', csso()))
        .pipe(gulpif(process.env.NODE_ENV === 'prod', autoprefixer(config.autoprefixer)))
        .pipe(gulp.dest('assets/css'))
});

//TO DO: implement SCSS lint (https://www.npmjs.com/package/gulp-sass-lint)