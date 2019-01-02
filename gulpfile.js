const $ = require('gulp-load-plugins')()
const del = require('del')
const gulp = require('gulp')

process.on('unhandledRejection', err => {
  throw err
})

function clean () {
  return del('dist/**')
}

function styles () {
  return gulp.src('src/**/*.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.postcss())
    .pipe($.rename('isotope.css'))
    .pipe(gulp.dest('./dist'))
    .pipe($.cssnano())
    .pipe($.rename('isotope.min.css'))
    .pipe(gulp.dest('./dist'))
    .pipe($.livereload())
}

exports.build = gulp.series(clean, styles)

function watch () {
  gulp.watch('src/**/*.scss', styles)
}

exports.watch = gulp.series(clean, styles, watch)
