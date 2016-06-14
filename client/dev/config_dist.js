System.config({
    defaultJSExtensions: true,
    paths: {
      '@angular/*': './@angular/*',
      "rxjs/*": "./rxjs/*",
      "ng2-nvd3/*":"./ng2-nvd3/*",
      "reflect-metadata": "./reflect-metadata"
    },
    map: {
      "rxjs": "node_modules/rxjs",
      'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api', // this is something new since angular2 rc.0, don't know what it does
      '@angular':                   'node_modules/@angular',
      'ng2-nvd3':'node_modules/ng2-nvd3'
    },
    packages: {
      '@angular/common': {
        main: 'index'
      },
      '@angular/compiler': {
        main: 'index'
      },
      '@angular/core': {
        main: 'index'
      },
      '@angular/http': {
        main: 'index'
      },
      '@angular/platform-browser-dynamic': {
        main: 'index'
      },
      '@angular/platform-browser': {
        main: 'index'
      },
      '@angular/router': {
        main: 'index'
      },
      '@angular/router-deprecated': {
        main: 'index'
      },
      "rxjs": {
        defaultExtension: 'js'
      },
      "ng2-nvd3":{
        main: 'build/lib/ng2-nvd3'
      },
      'dist': {
        defaultExtension: 'js',
        format: 'register'
      }
    }
  });
