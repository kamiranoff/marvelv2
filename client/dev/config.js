System.config({
    defaultJSExtensions: true,
    paths: {
      '@angular/*': './@angular/*',
      "rxjs/*": "./rxjs/*",
      "ng2-nvd3/*":"./ng2-nvd3/*",
      "reflect-metadata": "./reflect-metadata"
    },
    map: {
      "rxjs": "./rxjs"
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
