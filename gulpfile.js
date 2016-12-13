var path         = require('path');
var gulp         = require('gulp');
var environments = require('gulp-environments');
var less         = require('gulp-less');
var sourcemaps   = require('gulp-sourcemaps');
var source       = require('vinyl-source-stream');
var rollup       = require('rollup-stream');
var uglify       = require('rollup-plugin-uglify');
var babel        = require('rollup-plugin-babel');
var browserSync  = require('browser-sync').create();
var reload       = browserSync.reload;
var development  = environments.development;
var production   = environments.production;
var assetsDir    = development() ? './tmp/' : './assets/';

// Static server
gulp.task('browser-sync', ['less', 'js'], function() {
    browserSync.init({
      // ghost server
      proxy: "http://localhost:2368",
      serveStatic: [{
        route: '/assets',
        dir: 'tmp'
      }],
      port: 8088,
      ui: {
        port: 8089
      },
      open: false,
    });

});

gulp.task('watch-all', ['browser-sync'], () => {
  gulp.watch("./src/less/**/*.less", ['less']);
  gulp.watch("./src/js/**/*.js", ['js']);
  gulp.watch(["./*.hbs", "./partials/**/*.hbs"]).on("change", reload);
})


gulp.task('less', () => {
  return gulp.src('./src/less/main.less')
  .pipe(development(sourcemaps.init()))
  .pipe(less({
    compress: !development()
  }))
  .on('error', function (err) {
    console.error('Error!', err.message);
  })
  .pipe(development(sourcemaps.write()))
  .pipe(gulp.dest(path.join(assetsDir, 'css')))
  .pipe(browserSync.reload({stream:true}));
});


gulp.task('js', () => {
  return rollup({
    entry: './src/js/main.js',
    sourceMap: development(),
    format: 'umd',
    external: [
      'prismjs', 'jquery'
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      production(uglify())
    ]
  })
  .pipe(source('main.js'))
  .pipe(gulp.dest(path.join(assetsDir, 'js')))
  .pipe(browserSync.reload({stream:true}));
});

gulp.task('build', ['less', 'js'])

// or...
gulp.task('default', ['watch-all']);
