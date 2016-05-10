"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const comicvineCharacterSchema = require('./../character-model');
const _ = require('lodash');



comicvineCharacterSchema.statics.getAllFromDC = () => {
  return new Promise((resolve, reject) => {
    let _query = {'character.publisher.name':'DC Comics'};
    let fields = '';

    CharactersFromDC
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




comicvineCharacterSchema.statics.getMoreCharactersFromDC = (lastName,qty) => {
  return new Promise((resolve, reject) => {
    let _query = {
      "character.name": { "$gt": lastName },
      'character.publisher.name':'DC Comics'
    };
    let fields = '';

    CharactersFromDC
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


comicvineCharacterSchema.statics.getCharactersByNameFromDC = (input) => {
  console.log("input",input);
  return new Promise((resolve, reject) => {
    if (!_.isString(input)) {
      return reject(new TypeError('is not a valid string.'));
    }
    let _query = {
      "character.name": { "$regex": input, "$options": "i" },
      'character.publisher.name':'DC Comics'
    };
    let fields = '';
    CharactersFromDC
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



const CharactersFromDC  = mongoose.model('ComicvineCharactersFromDC', comicvineCharacterSchema,"charactersdetails");
module.exports = CharactersFromDC;
