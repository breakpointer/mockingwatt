var gulp = require('gulp');
var rework = require('gulp-rework');
var at2x = require('rework-plugin-at2x');
var suit = require('rework-suit');
var autoprefixer = require('gulp-autoprefixer');
var handleErrors = require('../util/handleErrors');

gulp.task('css', ['images'], function () {
  return gulp.src('src/css/*.css')
    .pipe(rework(at2x(), suit(), {sourcemap: true}))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest('build'));
});
