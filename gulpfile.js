var gulp = require('gulp');
var gutil = require('gulp-util');
var changed = require('gulp-changed');
var nunjucks = require('gulp-nunjucks-html');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var webpackCompiler = webpack(webpackConfig);
var paths = {
  dist: 'dist',
  templates: 'templates/**/*.html',
  publicFiles: 'public/**/*'
};

function webpackCompilationHandler(cb) {
  return function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack]', stats.toString({
      colors: true
    }));

    if (cb) {
      cb();
    }
  };
}

gulp.task('webpack', function(cb) {
  webpackCompiler.run(webpackCompilationHandler(cb));
});

gulp.task('watch-webpack', function() {
  webpackCompiler.watch({
    aggregateTimeout: 200
  }, webpackCompilationHandler());
});

gulp.task('nunjucks', function() {
  return gulp.src(paths.templates)
    .pipe(nunjucks({
      searchPaths: ['templates'],
      autoescape: true
    }))
    .on('error', function(err) {
      gutil.log('[nunjucks]', err);
    })
    .pipe(gulp.dest(paths.dist));
});

gulp.task('copy-public-files', function() {
  return gulp.src(paths.publicFiles)
    .pipe(changed(paths.dist))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watch-default', ['copy-public-files', 'nunjucks'], function() {
  gulp.watch(paths.publicFiles, ['copy-public-files']);
  gulp.watch(paths.templates, ['nunjucks']);
});

gulp.task('run-server', function() {
  var http = require('http');
  var ecstatic = require('ecstatic');

  http.createServer(ecstatic({
    root: paths.dist,
    cache: null
  })).listen(8000, 'localhost');

  gutil.log('[run-server] Listening on localhost:8000');
});

gulp.task('build', ['copy-public-files', 'nunjucks', 'webpack']);
gulp.task('watch', ['watch-default', 'watch-webpack']);
gulp.task('develop', ['run-server', 'watch']);
gulp.task('default', ['develop']);
