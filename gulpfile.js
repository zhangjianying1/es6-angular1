var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-minify-css');
var copy = require('gulp-copy');
var watch = require('gulp-watch');
var connect = require('gulp-connect');



gulp.task('connect', function () {
    connect.server({
        root: './',
        livereload: true
    });
});
gulp.task('sass', function () {
    return gulp.src('./src/sass/base.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css/'));
});
gulp.task('copy' , function(){
    return gulp.src('./src/js/**/*.html')
        .pipe(gulp.dest('./src/__build/templates'))
})
gulp.task('cssmin', function(done){
    gulp.src(['./src/css/base.css'])
        .pipe(cssmin())
        .pipe(gulp.dest('./src/__build/css'))
        .on('end', done)
})
gulp.task('watch', function () {
    gulp.watch('./src/sass/base.scss', ['sass']);
    gulp.watch('./src/css/base.css', ['cssmin']);
    gulp.watch('./src/js/**/**/*.html', ['copy']);
});



gulp.task('default',['connect', 'watch'])
