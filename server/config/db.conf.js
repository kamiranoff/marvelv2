'use strict';

const mongoose = require('mongoose');
const dbConst = require('../constants/db.json');
mongoose.Promise = Promise; // Set mongoose to use ES6 Promises.

const reconnectTimeout = 5000; // ms.

function connect(dbURI) {
  mongoose.connect(dbURI, { auto_reconnect: true })
    .catch((e) => {
      console.log(e);
    }); // Catch the warning, no further treatment is required
  // because the Connection events are already doing this
  // for us.
}

class DBConfig {
  static init() {
    let URL;
    if (process.env.NODE_ENV === 'production') {
      // URL = process.env.MONGOHQ_URL
      URL = dbConst.prod;
    } else {
      URL = dbConst.localhost;
    }

    const db = mongoose.connection;

    db.on('connecting', () => {
      console.info('Connecting to MongoDB...');
    });

    db.on('error', (error) => {
      console.error(`MongoDB connection error: ${error}`);
      mongoose.disconnect()
        .then(()=> console.log('successfully disconnected from db'))
        .catch(e => console.log('failed disconnecting from db', e));
    });

    db.on('connected', () => {
      console.info('Connected to MongoDB!');
    });

    db.once('open', () => {
      console.info('MongoDB connection opened!');
    });

    db.on('reconnected', () => {
      console.info('MongoDB reconnected!');
    });

    db.on('disconnected', () => {
      console.error(`MongoDB disconnected! Reconnecting in ${reconnectTimeout / 1000}s...`);
      setTimeout(() => connect(URL), reconnectTimeout);
    });

    return connect(URL);
  }
}

module.exports = DBConfig;
