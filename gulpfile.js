const del = require('del');
const gulp = require('gulp');
const webpack = require('webpack')(require('./webpack.config.js'));

gulp.task('clean',() => {
  return del('dist/**',{force : true});
});

gulp.task('transpile',(cb) => {
  webpack.run((err,stats) => {
    if (stats.compilation.errors.length) {
      stats.compilation.errors.forEach((err) => console.error(err));
      return cb(new Error('Webpack Failed'));
    }
    return cb(null,stats);
  });
});

gulp.task('build',gulp.series('clean',gulp.series('transpile')));

gulp.task('_do_watch',() => {
  gulp.watch('src/**/*',gulp.series('build'));
})

gulp.task('watch',gulp.series('build','_do_watch'));