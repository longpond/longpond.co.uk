var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

gulp.task('scripts', function() {
  return gulp.src(['resources/public/js/lib/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('resources/public/js'));
});

gulp.task('copy', function() {
  return gulp.src('bower_components/normalize-css/normalize.css')
    .pipe(rename('_normalize.scss'))
    .pipe(gulp.dest('bower_components/normalize-css'));
});

gulp.task('styles', ['copy'], function() {
  var opts = {
    outputStyle: 'compressed',
    includePaths: [
      'bower_components/bourbon/app/assets/stylesheets',
      'bower_components/sass-mediaqueries',
      'bower_components/normalize-css'
    ]
  };

  return gulp.src('scss/style.scss')
    .pipe(sass(opts))
    .pipe(gulp.dest('resources/public/css'));
});

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['styles']);
});

gulp.task('build', ['scripts', 'copy', 'styles']);
gulp.task('default', ['build', 'watch']);
