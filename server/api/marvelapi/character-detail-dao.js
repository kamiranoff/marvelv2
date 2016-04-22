"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const characterSchema = require('./marvel-model');
const _ = require('lodash');


characterSchema.statics.getCharacterDetail = (id) => {
  return new Promise((resolve, reject) => {
    id = Number(id);
    if (!_.isNumber(id)) {
      console.log(typeof(id));
      return reject(new TypeError('Id is not a valid number.'));
    }
    CharacterDetail
      .find({'character.id':id})
      .exec((err, characterDetail) => {
        if(err){
          reject(err)
        }else{
          resolve(characterDetail);
        }
      });
  });
};

const CharacterDetail  = mongoose.model('CharacterDetail', characterSchema,"characters");
module.exports = CharacterDetail;
