import gulp from 'gulp';
import rename from 'gulp-rename';
import {path, tasks} from './const';

gulp.task(tasks.RENAME, () => {
  return gulp.src(path.DEV + 'index_dist.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest(path.DIST));
});
