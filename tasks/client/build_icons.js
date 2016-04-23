import gulp from 'gulp';
import iconfont from 'gulp-iconfont';
import  iconfontCss from 'gulp-iconfont-css';
import consolidate from 'gulp-consolidate';

import {path, tasks} from './const';

const ICONS = path.DEV + 'common/icons/svg/*.svg';
const ICONS_SCSS = path.DEV + 'common/scss/_icons.scss';
var fontName = 'icons';

var app = {
  front: path.DEV + 'common/icons/',
  assets:  path.DEV + '/assets/fonts/'
};
var template = 'icon';

gulp.task(tasks.CLIENT_ICONS_DIST, () => {
  return gulp.src(ICONS, {base: path.DEV})
    .pipe(iconfont({
      fontName: fontName, // required
      normalize: true
    }))

    .on('glyphs', function(glyphs, options) {
      console.log("glyphs",glyphs);
      options = {
        glyphs: glyphs,
        fontName: fontName,
        fontPath: '', // set path to font (from your CSS file if relative)
        className: 'icon', // set class name in your CSS
        fontHeight: 1001,
        centerHorizontally: true
      };
      gulp.src(app.front + 'templates/' + template + '.css')
        .pipe(consolidate('lodash', options))
        .pipe(gulp.dest(app.assets + 'icons')); // set path to export your CSS

      // if you don't need sample.html, remove next 4 lines
      gulp.src(app.front + 'templates/' + template + '.html')
        .pipe(consolidate('lodash', options))
        .pipe(gulp.dest(app.assets + 'icons')); // set path to export your sample HTML
    })
    .pipe(gulp.dest(app.assets + 'icons')); // set path to export your fonts
});

