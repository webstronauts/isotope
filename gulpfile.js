const $ = require('gulp-load-plugins')()
const functions = require('./lib/functions')
const gulp = require('gulp')

process.on('unhandledRejection', err => {
  throw err
})

gulp.task('styles', () => (
  gulp.src('src/**/*.scss')
    .pipe($.sass({
      functions
    }).on('error', $.sass.logError))
    .pipe($.postcss([
      require('autoprefixer')()
    ]))
    .pipe($.rename('style.css'))
    .pipe(gulp.dest('./dist'))
    .pipe($.cssnano())
    .pipe($.rename('style.min.css'))
    .pipe(gulp.dest('./dist'))
    .pipe($.livereload())
))

gulp.task('default', ['styles'])

gulp.task('watch', ['default'], () => {
  gulp.watch('src/**/*.scss', ['styles'])
})
