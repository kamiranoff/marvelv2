"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const comicvineCharacterSchema = require('./character-model');
const _ = require('lodash');



comicvineCharacterSchema.statics.getAll = () => {
  return new Promise((resolve, reject) => {
    let _query = {};
    let fields = '';

    Characters
      .find(_query,fields)
      .sort({ "name": 1 })
      .limit(100)
      .exec((err, characters) => {
        if(err){ reject(err)}else{
          resolve(characters);
        }
      });
  });
};

comicvineCharacterSchema.statics.getMoreCharacters = (lastid,qty) => {
  return new Promise((resolve, reject) => {
    let _query = { "_id": { "$gt": lastid }};
    let fields = '';

    Characters
      .find(_query,fields)
      .sort({ "_id": 1 })
      .limit(qty)
      .exec((err, characters) => {
        if(err){ reject(err)}else{
          resolve(characters);
        }
      });
  });
};


comicvineCharacterSchema.statics.getCharactersByName = (input) => {
  return new Promise((resolve, reject) => {
    if (!_.isString(input)) {
      return reject(new TypeError('is not a valid string.'));
    }
    let _query = { "name": { "$regex": input, "$options": "i" }};
    let fields = '';
    Characters
      .find( _query ,fields)
      .exec((err, characters) => {
        if(err){
          reject(err)
        }else{
          resolve(characters);
        }
      });
  });
};



const Characters  = mongoose.model('ComicvineCharacters', comicvineCharacterSchema,"charactersdetails");
module.exports = Characters;
