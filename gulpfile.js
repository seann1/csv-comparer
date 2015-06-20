var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');

gulp.task('sass', function () {
	gulp.src('./sass/**/*.scss')
	    .pipe(sass().on('error', sass.logError))
	    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
        }))
	    .pipe(gulp.dest('css/'));
});

gulp.task('libraries', function() {
    return gulp.src(['bower_components/jquery/dist/jquery.js', 
    				'bower_components/bootstrap/dist/js/bootstrap.js'])
    	.pipe(uglify())
      	.pipe(concat('libraries.min.js'))
      	.pipe(gulp.dest('build/js'));
});

gulp.task('scripts', function() {
    return gulp.src('scripts/main.js')
    	.pipe(uglify())
      	.pipe(concat('main.min.js'))
      	.pipe(gulp.dest('build/js'));
});

gulp.task('styles', function() {
    return gulp.src(['bower_components/bootstrap/dist/css/bootstrap.css',
    				'bower_components/bootstrap/dist/css/bootstrap-theme.css'])
      	.pipe(minifyCss({compatibility: 'ie8'}))
      	.pipe(concat('main.min.css'))
      	.pipe(gulp.dest('build/css'));
});

gulp.task('connect', function() {
  connect.server({ livereload: true });
});

gulp.task('html', function () {
  gulp.src('.')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./scripts/main.js'], connect.reload());
  gulp.watch('./css/**/*.css', ['sass'])
  	.pipe(connect.reload());
});

gulp.task('default', ['libraries', 'styles', 'connect', 'watch']);