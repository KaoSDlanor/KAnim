const del = require('del');
const gulp = require('gulp');
const webpack = require('gulp-webpack')(require('./webpack.config.js'),require('webpack'));

gulp.task('clean',() => {
  return del('dist/**',{force : true});
});

gulp.task('transpile',() => {
  return gulp.src('src/index.ts')
    .pipe(webpack)
    .pipe(gulp.dest('dist/'));
});

gulp.task('build',gulp.series('clean',gulp.series('transpile')));

gulp.task('_do_watch',() => {
  gulp.watch('src/**/*',gulp.series('build'));
})

gulp.task('watch',gulp.series('build','_do_watch'));