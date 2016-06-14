import gulp from 'gulp';
import Builder from 'systemjs-builder';
import ts from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import {path, tasks} from './const';

var tsProject = ts.createProject('tsconfig.json');

var appDev = 'client/dev'; // where your ts files are, whatever the folder structure in this folder, it will be recreated in the below 'dist/app' folder
var appProd = 'client/dist';

/** first transpile your ts files */
gulp.task(tasks.CLIENT_BUNDLE_TS, () => {
  return gulp.src(appDev + '/**/*.ts')
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(ts(tsProject))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(appProd));
});

/** then bundle */
gulp.task(tasks.CLIENT_BUNDLE_JS, function() {
  // optional constructor options
  // sets the baseURL and loads the configuration file
  var builder = new Builder('', 'client/dev/config_dist.js');

  /*
   the parameters of the below buildStatic() method are:
   - your transcompiled application boot file (the one wich would contain the bootstrap(MyApp, [PROVIDERS]) function - in my case 'dist/app/boot.js'
   - the output (file into which it would output the bundled code)
   - options {}
   */
  return builder
    .buildStatic(appProd + '/index.js', appProd + '/bundle.js', { minify: false, sourceMaps: true})
    .then(function() {
      console.log('Build complete');
    })
    .catch(function(err) {
      console.log('Build error');
      console.log(err);
    });
});
