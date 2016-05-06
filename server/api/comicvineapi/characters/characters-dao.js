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
      .sort({ "character.name": 1 })
      .limit(100)
      .exec((err, characters) => {
        if(err){ reject(err)}else{
          resolve(characters);
        }
      });
  });
};

comicvineCharacterSchema.statics.getMoreCharacters = (lastName,qty) => {
  return new Promise((resolve, reject) => {
    let _query = { "character.name": { "$gt": lastName }};
    let fields = '';

    Characters
      .find(_query,fields)
      .sort({ "character.name": 1 })
      .limit(qty)
      .exec((err, characters) => {
        if(err){ reject(err)}else{
          resolve(characters);
        }
      });
  });
};


comicvineCharacterSchema.statics.getCharactersByName = (input) => {
  console.log("input",input);
  return new Promise((resolve, reject) => {
    if (!_.isString(input)) {
      return reject(new TypeError('is not a valid string.'));
    }
    let _query = { "character.name": { "$regex": input, "$options": "i" }};
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
