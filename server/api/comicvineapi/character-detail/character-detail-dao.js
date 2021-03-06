"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const characterSchema = require('./character-detail-model');

const _ = require('lodash');


characterSchema.statics.getCharacterDetail = (id) => {
  return new Promise((resolve, reject) => {
    id = Number(id);
    if (!_.isNumber(id)) {
      return reject(new TypeError('Id is not a valid number.'));
    }

    ComicvineCharacterDetail
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

const ComicvineCharacterDetail  = mongoose.model('ComicvineCharacterDetail', characterSchema,"charactersdetails");
module.exports = ComicvineCharacterDetail;
