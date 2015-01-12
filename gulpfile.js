'use strict';

var gulp = require('gulp'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream');

gulp.task('browserify', function(){
	return browserify(['./src/index.js'], { standalone: 'informal' })
		.bundle()
		.pipe(source('informal.js'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('default', ['browserify'], function(){
	gulp.watch(['src/*.js', 'src/**/*.js'], ['browserify']);
});
