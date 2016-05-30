"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const comicvineCharacterSchema = require('./../character-model');
const _ = require('lodash');


const Marvel = 'Marvel';
const DC = 'DC Comics';
const Nintendo = 'Nintendo';
const Hasbro = 'Hasbro';
const Archie = 'Archie Comics';
const TopCow = 'Top Cow';
const DarkHorse = 'Dark Horse Comics';
const Image = 'Image';
const AspenMLT = 'Aspen MLT';
const Dynamite = 'Dynamite Entertainment';
const IDW = 'IDW Publishing';
const BroadSword = 'Broadsword Comics';

var unwantedPublishers =[
  {'character.publisher.name':Marvel},
  {'character.publisher.name':DC},
  {'character.publisher.name':Nintendo},
  {'character.publisher.name':Hasbro},
  {'character.publisher.name':Archie}

];

var publishers = [
  {'character.publisher.name':TopCow},
  {'character.publisher.name':DarkHorse},
  {'character.publisher.name':Image},
  {'character.publisher.name':AspenMLT},
  {'character.publisher.name':Dynamite},
  {'character.publisher.name':BroadSword}
] ;

comicvineCharacterSchema.statics.getAllNamesAndAppearancesFromTopCow = () => {
  return new Promise((resolve, reject) => {
    let _query = {
      $or:publishers,
      'character.count_of_issue_appearances':{ $gt: 0}};
    let fields = 'character.name character.id character.count_of_issue_appearances';

    CharactersFromTopCow
      .find(_query,fields)
      .sort({ "character.count_of_issue_appearances": -1 })
      .exec((err, characters) => {
        if(err){ reject(err)}else{
          resolve(characters);
        }
      });
  });
};

comicvineCharacterSchema.statics.getAllFromTopCow = () => {
  return new Promise((resolve, reject) => {
    let _query = {
      $or:publishers
      //$nor:unwantedPublishers
    };
    let fields = '';

    CharactersFromTopCow
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




comicvineCharacterSchema.statics.getMoreCharactersFromTopCow = (lastName,qty) => {
  var qty = parseInt(qty);
  return new Promise((resolve, reject) => {

    if (!_.isNumber(qty)) {
      return reject(new TypeError('is not a valid number.'));
    }
    let _query = {
      "character.name": { "$gt": lastName },
      $or:publishers
      //$nor:unwantedPublishers
    };
    let fields = '';

    CharactersFromTopCow
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


comicvineCharacterSchema.statics.getCharactersByNameFromTopCow = (input) => {
  console.log("input",input);
  return new Promise((resolve, reject) => {
    if (!_.isString(input)) {
      return reject(new TypeError('is not a valid string.'));
    }
    let _query = {
      "character.name": { "$regex": input, "$options": "i" },
      $or:publishers
      //$nor:unwantedPublishers
    };
    let fields = '';
    CharactersFromTopCow
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



const CharactersFromTopCow  = mongoose.model('ComicvineCharactersFromTopCow', comicvineCharacterSchema,"charactersdetails");
module.exports = CharactersFromTopCow;
