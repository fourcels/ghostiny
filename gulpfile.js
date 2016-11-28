var gulp        = require('gulp');
var less        = require('gulp-less');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

// Static server
gulp.task('browser-sync', ['less-watch'], function() {
    browserSync.init({
      // ghost server
      proxy: "http://localhost:2368"
    });
    gulp.watch("assets/less/**/*.less", ['less-watch']);
    gulp.watch(["./*.hbs", "./partials/**/*.hbs"]).on("change", reload);
});


gulp.task('less-watch', () => {
  return gulp.src('assets/less/main.less')
  .pipe(less())
  .on('error', function (err) {
    console.error('Error!', err.message);
  })
  .pipe(gulp.dest('assets/css'))
  .pipe(browserSync.reload({stream:true}));
});

// or...

gulp.task('default', ['browser-sync']);
