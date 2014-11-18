var browserSync = require('browser-sync');
var gulp        = require('gulp');

gulp.task('browserSync', ['build'], function() {
  browserSync({
    files: [
      // Watch everything in build
      "build/**",
      // Exclude sourcemap files
      "!build/**.map"
    ]
  });
});
