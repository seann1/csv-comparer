var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');

gulp.task('sass', function () {
	gulp.src('public/sass/**/*.scss')
	    .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
	    .pipe(gulp.dest('public/css/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('public/sass/*.scss', ['sass']);
});

gulp.task('libraries', function() {
    return gulp.src(['node_modules/angular/angular.js', 'bower_components/jquery/dist/jquery.js',
            'public/scripts/underscore.js', 'bower_components/bootstrap/dist/js/bootstrap.js','node_modules/three/three.js',
            'public/scripts/papaparse.min.js', 'node_modules/ng-file-upload/dist/ng-file-upload.js',
						'public/scripts/highlight.pack.js', 'public/scripts/TrackballControls.js', 'public/scripts/tween.min.js'])
    	.pipe(uglify())
      	.pipe(concat('libraries.min.js'))
      	.pipe(gulp.dest('build/js'));
});

gulp.task('styles', function() {
    return gulp.src(['bower_components/bootstrap/dist/css/bootstrap.css',
    				'public/css/railscasts.css'])
      	.pipe(minifyCss({compatibility: 'ie8'}))
      	.pipe(concat('main.min.css'))
      	.pipe(gulp.dest('public/build/css'));
});

gulp.task('connect', function() {
  connect.server({ livereload: true,
                    port: 8001 });
});

gulp.task('reload', function () {
  gulp.src(['public/scripts/main.js', 'public/index.html', 'public/css/*.css'])
  .pipe(connect.reload());
});

gulp.task('watch', function () {
  return gulp.watch(['public/scripts/main.js', 'public/css/*.css', 'public/index.html'], ['reload']);
});

gulp.task('default', ['libraries', 'styles', 'connect', 'watch', 'sass:watch']);
