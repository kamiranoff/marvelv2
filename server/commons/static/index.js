"use strict";

const fs = require('fs');
var targetFolder;
if(process.env.NODE_ENV === 'production'){
  targetFolder = 'dist';
}else{
  targetFolder = 'dev'
}

module.exports = class StaticDispatcher {

    static sendIndex(req, res) {
      var _root = process.cwd();

      res.type('.html');

      fs.createReadStream(_root + '/client/'+targetFolder+'/index.html')
        .pipe(res);
    }
  static sendJs(req, res) {
    var _root = process.cwd();


    res.type('.js');

    fs.createReadStream(_root + '/node_modules/jquery/'+targetFolder+'/jquery.js')
      .pipe(res);
  }


  static uniq(a) {
    return Array.from(new Set(a));
  }

  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
};
