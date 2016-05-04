"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const characterSchema = require('./character-model');
const _ = require('lodash');



characterSchema.statics.getAll = () => {
  return new Promise((resolve, reject) => {
    let _query = {};
    let fields = 'character.id character.thumbnail character.name character.wiki.categories character.wiki.groups character.wiki.bio';

    Characters
      .find(_query,fields)
      .sort({ "_id": 1 })
      .limit(100)
      .exec((err, characters) => {
        if(err){ reject(err)}else{
          resolve(characters);
        }
      });
  });
};

characterSchema.statics.getMoreCharacters = (lastid,qty) => {
  return new Promise((resolve, reject) => {
    let _query = { "_id": { "$gt": lastid }};
    let fields = 'character.id character.thumbnail character.name character.wiki.categories character.wiki.groups character.wiki.bio';

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


characterSchema.statics.getCharactersByName = (input) => {
  return new Promise((resolve, reject) => {
    if (!_.isString(input)) {
      return reject(new TypeError('is not a valid string.'));
    }
    let _query = { "character.name": { "$regex": input, "$options": "i" }};
    let fields = 'character.id character.thumbnail character.name character.wiki.categories character.wiki.groups character.wiki.bio';
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

characterSchema.statics.getCharactersByCategory = (input) => {
  var inputArray = input.split(',');
  var inputArrayRegex = [];
  inputArray.forEach(function(opt){
    inputArrayRegex.push(  new RegExp(opt, "i") );
  });
  return new Promise((resolve, reject) => {
    if (!_.isArray(inputArrayRegex)) {
      return reject(new TypeError(' is not a valid array.'));
    }
    let _query = {"character.wiki.categories": { "$all": inputArrayRegex  }};
    let fields = 'character.id character.thumbnail character.name character.wiki.categories character.wiki.groups character.wiki.bio';
    Characters
      .find( _query ,fields )
      .exec((err, characters) => {
        if(err){
          reject(err)
        }else{
          resolve(characters);
        }
      });
  });
};

const Characters  = mongoose.model('Character', characterSchema,"characters");
module.exports = Characters;