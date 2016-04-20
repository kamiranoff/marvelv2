"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const characterSchema = require('./marvel-model');
const _ = require('lodash');

characterSchema.statics.getAll = () => {
  return new Promise((resolve, reject) => {
    let _query = {};
    let fields = 'character.id character.thumbnail character.name character.wiki.categories character.wiki.groups character.wiki.bio';

    Marvel
      .find(_query,fields)
      .limit(300)
      .exec((err, characters) => {
        if(err){ reject(err)}else{
          resolve(characters);
        }
      });
  });
};

characterSchema.statics.getCharacterDetail = (id) => {
  return new Promise((resolve, reject) => {
    id = Number(id);
    if (!_.isNumber(id)) {
      console.log(typeof(id));
      return reject(new TypeError('Id is not a valid number.'));
    }
    Marvel
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





const Marvel  = mongoose.model('Character', characterSchema,"characters");

module.exports = Marvel;
