var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

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
    				'style.css'])
      	.pipe(minifyCss({compatibility: 'ie8'}))
      	.pipe(concat('main.min.css'))
      	.pipe(gulp.dest('build/css'));
});

gulp.task('default', ['scripts', 'styles']);