var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();

gulp.task('eslint', function () {
  var fs = require('fs');
  gulp.src('app/scripts/**/*.js')
    .pipe($.eslint('.eslintrc'))
    .pipe($.eslint.format('checkstyle', fs.createWriteStream('reports/eslint-checkstyle.xml')));
});

gulp.task('csslint', $.shell.task('csslint --format=checkstyle-xml app/styles > reports/csslint-checkstyle.xml'));

gulp.task('htmlhint', function () {
  process.env.HTMLHINT_CHECKSTYLE_FILE = 'reports/htmlhint-checkstyle.xml';
  gulp.src('app/**/*.html')
    .pipe($.htmlhint('.htmlhintrc'))
    .pipe($.htmlhint.reporter('gulp-htmlhint-checkstyle-file-reporter'));
});

gulp.task('lint', ['eslint', 'csslint', 'htmlhint'], function () {
});

gulp.task('default', function () {
  gulp.start('lint');
});
