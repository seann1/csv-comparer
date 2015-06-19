var gulp = require('gulp');

var concat = require('gulp-concat');

gulp.task('scripts', function() {
    return gulp.src(['bower_components/jquery/dist/jquery.js', 
    				'bower_components/bootstrap/dist/js/bootstrap.js',
    				'scripts/main.js'])
      .pipe(concat('main.js'))
      .pipe(gulp.dest('build/js'));
});

gulp.task('styles', function() {
    return gulp.src(['bower_components/bootstrap/dist/css/bootstrap.css',
    				'bower_components/bootstrap/dist/css/bootstrap-theme.css',
    				'style.css'])
      .pipe(concat('main.css'))
      .pipe(gulp.dest('build/css'));
});

gulp.task('default', ['scripts', 'styles']);