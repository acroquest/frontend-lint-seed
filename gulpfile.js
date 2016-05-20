var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();
var del = require('del');
var vinylPaths = require('vinyl-paths');

var REPORT_DIR = 'reports/';
var ESLINT_FILE_NAME = 'eslint-checkstyle.xml';
var CSSLINT_FILE_NAME = 'csslint-checkstyle.xml';
var HTMLHINT_FILE_NAME = 'htmlhint-checkstyle.xml';

gulp.task('eslint', function () {
  var fs = require('fs');
  gulp.src('app/scripts/**/*.js')
    .pipe($.eslint('.eslintrc'))
    .pipe($.eslint.format('checkstyle', fs.createWriteStream(REPORT_DIR + ESLINT_FILE_NAME)));
});

gulp.task('csslint',
  $.shell.task('csslint --format=checkstyle-xml app/styles > ' + REPORT_DIR + CSSLINT_FILE_NAME)
);

process.env.HTMLHINT_CHECKSTYLE_FILE = REPORT_DIR + HTMLHINT_FILE_NAME;
gulp.task('htmlhint', function () {
  gulp.src('app/**/*.html')
    .pipe($.htmlhint('.htmlhintrc'))
    .pipe($.htmlhint.reporter('gulp-htmlhint-checkstyle-file-reporter'))
    .pipe(gulp.dest(REPORT_DIR + '.tmp'))
    .on('end', function () {
      gulp.src(REPORT_DIR + '*.tmp.*')
        .pipe(vinylPaths(del))
        .pipe($.concat(HTMLHINT_FILE_NAME))
        .pipe($.header('<?xml version="1.0" encoding="utf-8"?>\n<checkstyle version="4.3">\n'))
        .pipe($.footer('\n</checkstyle>'))
        .pipe(gulp.dest(REPORT_DIR))
        .on('end', function () {
          del([REPORT_DIR + '.tmp']);
        });
    });
});

gulp.task('lint', ['eslint', 'csslint', 'htmlhint'], function () {
  gulp.src(REPORT_DIR + '*.xml')
    .pipe($.prettyData({ type: 'prettify' }))
    .pipe(gulp.dest(REPORT_DIR));
});

gulp.task('lint:clean', function () {
  return del([REPORT_DIR + '*.*']);
});

gulp.task('default', ['lint:clean'], function () {
  gulp.start('lint');
});
