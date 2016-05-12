"use strict";

const fs = require('fs');

module.exports = class StaticDispatcher {
    static sendIndex(req, res) {
      var _root = process.cwd();

      res.type('.html');

      fs.createReadStream(_root + '/client/dev/index.html')
        .pipe(res);
    }
  static sendJs(req, res) {
    var _root = process.cwd();

    res.type('.js');

    fs.createReadStream(_root + '/node_modules/jquery/dist/jquery.js')
      .pipe(res);
  }


  static uniq(a) {
    return Array.from(new Set(a));
  }

  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
};
