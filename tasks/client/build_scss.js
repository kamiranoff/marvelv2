import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

import {path, tasks} from './const';

const SCSS = path.DEV + 'common/scss/styles.scss';
const SCSS_DEST = path.DEV;
gulp.task(tasks.CLIENT_BUILD_SCSS_DEV, function () {
  return gulp.src(SCSS)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(SCSS_DEST));
});
