'use strict';
var gulp = require("gulp");
var sass = require("gulp-sass");
const fontmin = require('gulp-fontmin');


gulp.task('tasks', function(){
    gulp.start('fontmin','sass', 'sass:watch')
});


gulp.task('fontmin', () =>
    gulp.src(__dirname+'/styles/myfonts/*.ttf')
        .pipe(fontmin())
        .pipe(gulp.dest('public/fonts'))
);

gulp.task('sass', function(){
    return gulp.src('./styles/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./public/'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./styles/*.scss', ['sass']);
});