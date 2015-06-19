var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');

gulp.task('sass', function () {
	gulp.src('./sass/**/*.scss')
	    .pipe(sass().on('error', sass.logError))
	    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  	gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('scripts', function() {
    return gulp.src(['bower_components/jquery/dist/jquery.js', 
    				'bower_components/bootstrap/dist/js/bootstrap.js',
    				'scripts/main.js'])
    	.pipe(uglify())
      	.pipe(concat('main.min.js'))
      	.pipe(gulp.dest('build/js'));
});

gulp.task('styles', function() {
    return gulp.src(['bower_components/bootstrap/dist/css/bootstrap.css',
    				'bower_components/bootstrap/dist/css/bootstrap-theme.css',
    				'css/styles.css'])
      	.pipe(minifyCss({compatibility: 'ie8'}))
      	.pipe(concat('main.min.css'))
      	.pipe(gulp.dest('build/css'));
});

gulp.task('default', ['scripts', 'styles']);