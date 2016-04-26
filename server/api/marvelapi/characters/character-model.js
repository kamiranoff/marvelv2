"use strict";

const mongoose = require('mongoose');

const _marvelSchema = {
  character: {
    name:{type:String},
    thumbnail: {
      path: {
        type: String
      },
      extentions: {
        type: String
      }
    },
    wiki: {
      type: Object
    },
    description: {
      type: String
    }
  }
}

module.exports = mongoose.Schema(_marvelSchema);
