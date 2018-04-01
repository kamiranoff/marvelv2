'use strict';

const mongoose = require('mongoose');
const dbConst = require('../constants/db.json');

class DBConfig {
  static init() {
    let URL;
    if (process.env.NODE_ENV === 'production') {
      // URL = process.env.MONGOHQ_URL
      URL = dbConst.prod;
    } else {
      URL = dbConst.localhost;
    }

    const dbOptions = {
      socketOptions: {
        // This option is on by default, but why not set it explicitly
        autoReconnect: true
      },
      // This options is 1 second by default, its possible the ha
      // takes longer than 30 seconds to recover.
      reconnectInterval: 5000,
      // This options is 30 by default, why not make it 60
      reconnectTries: 60
    };

    mongoose.connect(URL, dbOptions)
      .then(() => console.log('successfully connected to db'))
      .catch(err => {
        console.error(err);
      });
  }
}

module.exports = DBConfig;
