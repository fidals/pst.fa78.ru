var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var del = require('del');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');

// ***********************************
// BUILD
// ***********************************
gulp.task('build', ['clean'], function() {
  gulp.start('jade', 'sass', 'image', 'script');
});

// ***********************************
// JADE
// ***********************************
gulp.task('jade', function() {
  return gulp.src(['src/*.jade', '!src/_*.jade'])
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

// ***********************************
// SASS
// ***********************************
gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

// ***********************************
// IMAGE
// ***********************************
gulp.task('image', function() {
  gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
});

// ***********************************
// SCRIPT
// ***********************************
gulp.task('script', function() {
  gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

// ***********************************
// CLEAN
// ***********************************
gulp.task('clean', function() {
  return del(['dist/**/*']);
});

// ***********************************
// CONNECT
// ***********************************
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

// ***********************************
// WATCH
// ***********************************
gulp.task('watch', function() {
  gulp.watch('src/**/*.jade', ['jade']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['script']);
});

// ***********************************
// DEFAULT
// ***********************************
gulp.task('default', ['watch', 'connect']);
