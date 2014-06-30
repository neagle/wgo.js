var gulp = require('gulp');
var debug = require('gulp-debug');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var bourbon = require('node-bourbon');
var dataUri = require('gulp-data-uri');
var autoprefix = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglifyjs');
var livereload = require('gulp-livereload');

gulp.task('themes-sass', function () {
	return gulp.src('./themes/**/src/scss/*.scss')
		.pipe(sass({
			errLogToConsole: true,
			sourceComments: 'map',
			sourceMap: 'sass',
			style: 'compact'
		}))
		.pipe(autoprefix({ map: false }))
		.pipe(rename(function (path) {
			path.dirname = path.basename;
			path.basename = 'wgo.player.' + path.basename;
		}))
		.pipe(gulp.dest('./themes'));
});

gulp.task('min-js', function () {
	return gulp.src([
		'wgo.js',
		'kifu.js',
		'sgfparser.js',
		'player.js',
		'basicplayer.js',
		'basicplayer.component.js',
		'basicplayer.infobox.js',
		'basicplayer.commentbox.js',
		'basicplayer.control.js',
		'player.editable.js',
		'scoremode.js',
		'player.permalink.js'
	], { cwd: 'wgo/src' })
		.pipe(uglify('wgo.min.js'))
		.pipe(gulp.dest('wgo'));
});

gulp.task('watch', function () {
	gulp.watch('themes/**/*.scss', ['themes-sass']);
});
