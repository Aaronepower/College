"use strict";

const gulp   = require('gulp')
    , del    = require('del')
    , concat = require('gulp-concat')
    , uglify = require('gulp-uglify')
    , wrap   = require('gulp-wrap')
    , expect = require('gulp-expect-file')
    , nodemon = require('gulp-nodemon')


gulp.task('scripts', function() {
    del.sync('./public/javascripts/script.js')
    return gulp.src('views/javascripts/*.js')
               .pipe(expect('views/javascripts/*.js'))
               .pipe(concat('script.js'))
               .pipe(wrap('(function ($, window, document){\n "use strict";\n <%= contents %>\n})($, window, document)'))
               .pipe(uglify())
               .pipe(gulp.dest('./public/javascripts'))
})

gulp.task('default', ['scripts'], function() {
  nodemon({ script : './bin/www'
          , ext : 'js'
          , env : { 'NODE_ENV' : 'development'
                  , 'port' : 80
                  }
          , watch: ['./app.js', './routes/*', './bin/*', './views/*']
          })
        .on('change', ['scripts'])
        .on('start', ['scripts'])
})