var path         = require('path');
var gulp         = require('gulp');
var rename       = require('gulp-rename');
var environments = require('gulp-environments');
var less         = require('gulp-less');
var sourcemaps   = require('gulp-sourcemaps');
var browserSync  = require('browser-sync').create();
var reload       = browserSync.reload;
var development  = environments.development;
var production   = environments.production;

// Static server
gulp.task('browser-sync', ['watch-all', 'less'], function() {
    browserSync.init({
      // ghost server
      proxy: "http://localhost:2368",
      port: 8088,
      ui: {
        port: 8089
      },
      injectChanges: false,
      notify: false,
      open: false,
      online: false // faster broswer-sync startup
    });

});

gulp.task('watch-all', () => {
  gulp.watch("assets/less/**/*", {cwd: __dirname },  ['less']);
  gulp.watch([
    "assets/js/**/*",
    "*.hbs",
    "partials/**/*.hbs"
  ], {cwd: __dirname }).on("change", reload);
})


gulp.task('less', () => {
  return gulp.src('./assets/less/main.less')
  .pipe(development(sourcemaps.init()))
  .pipe(less({
    compress: !development()
  }).on('error', function(err){  // catch compile error
    console.log(err.message);
    this.emit('end');
  }))
  .pipe(development(sourcemaps.write()))
  .pipe(production(rename({suffix: '.min'})))
  .pipe(gulp.dest('./assets/css/'))
  .pipe(browserSync.stream());
});


gulp.task('build', ['less'])

// or...
gulp.task('default', ['browser-sync']);
