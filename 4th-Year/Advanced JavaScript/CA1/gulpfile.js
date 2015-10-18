"use strict";

const gulp   = require('gulp')
    , del    = require('del')
    , concat = require('gulp-concat')
    , uglify = require('gulp-uglify')
    , jshint = require('gulp-jshint')
    , sourcemaps = require('gulp-sourcemaps')
    , jshintStylish = require('jshint-stylish')
    , wrap   = require('gulp-wrap')
    , nodemon = require('gulp-nodemon')


gulp.task('scripts', function() {
    del.sync('public/javascripts/script.js')
    return gulp.src('views/javascripts/**/*.js')
               .pipe(sourcemaps.init())
               .pipe(jshint({asi: true, laxcomma: true}))
               .pipe(jshint.reporter(jshintStylish))
               .pipe(concat('script.js'))
               .pipe(wrap('(function ($, window, document){\n "use strict";\n <%= contents %>\n})($, window, document)'))
               .pipe(uglify())
               .pipe(sourcemaps.write())
               .pipe(gulp.dest('public/javascripts'))
})

gulp.task('default', ['scripts'], function() {
  nodemon({ script : './bin/www'
          , ext : 'js'
          , env : { 'NODE_ENV' : 'development'
                  , 'port': 3000
                  }
          , watch: ['app.js', 'routes/*', 'bin/*', 'views/*']
          })
        .on('change', ['scripts'])
        .on('start', ['scripts'])
})