const $ = require('gulp-load-plugins')()
const del = require('del')
const gulp = require('gulp')

process.on('unhandledRejection', err => {
  throw err
})

gulp.task('clean', () =>
  del('dist/**') 
)

gulp.task('styles', ['clean'], () => (
  gulp.src('src/**/*.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.postcss())
    .pipe($.rename('isotope.css'))
    .pipe(gulp.dest('./dist'))
    .pipe($.cssnano())
    .pipe($.rename('isotope.min.css'))
    .pipe(gulp.dest('./dist'))
    .pipe($.livereload())
))

gulp.task('default', ['styles'])

gulp.task('watch', ['default'], () => {
  gulp.watch('src/**/*.scss', ['styles'])
})
