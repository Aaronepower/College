var gulp   = require('gulp')
,   gutil  = require('gulp-util')
,   uglify = require('gulp-uglify')
,   concat = require('gulp-concat')

gulp.task('js', function () {
	gulp.src('./public/javascripts/*.js')
			.pipe(uglify())
})

gulp.task('default', function () {
	gulp.run('js')
})