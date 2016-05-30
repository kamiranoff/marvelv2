"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const comicvineCharacterSchema = require('./../character-model');
const _ = require('lodash');


const publisher = 'DC Comics';

comicvineCharacterSchema.statics.getAllNamesAndAppearancesFromDC = () => {
  return new Promise((resolve, reject) => {
    let _query = {
      'character.publisher.name':publisher,
      'character.count_of_issue_appearances':{ $gt: 0}};
    let fields = 'character.name character.id character.count_of_issue_appearances';

    CharactersFromDC
      .find(_query,fields)
      .sort({ "character.count_of_issue_appearances": -1 })
      .exec((err, characters) => {
        if(err){ reject(err)}else{
          resolve(characters);
        }
      });
  });
};

comicvineCharacterSchema.statics.getAllFromDC = () => {
  return new Promise((resolve, reject) => {
    let _query = {'character.publisher.name':publisher};
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
  var qty = parseInt(qty);
  return new Promise((resolve, reject) => {


    let _query = {
      "character.name": { "$gt": lastName },
      'character.publisher.name':publisher
    };
    let fields = '';

    if (!_.isNumber(qty)) {
      return reject(new TypeError('is not a valid number.'));
    }

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
      'character.publisher.name':publisher
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
