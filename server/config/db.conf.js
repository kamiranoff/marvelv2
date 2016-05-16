"use strict";

const mongoose = require('mongoose');
const dbConst = require('../constants/db.json');

module.exports = class DBConfig {
    static init() {
      var URL;
      if(process.env.NODE_ENV === 'production'){
       // URL = process.env.MONGOHQ_URL
        URL = dbConst.localhost;
      }else{
        URL = dbConst.localhost;
      }


      mongoose.connect(URL);
      mongoose.connection.on('error', console.error.bind(console, 'An error ocurred with the DB connection: '));
    }
};
