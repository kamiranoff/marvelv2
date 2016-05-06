"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const characterDetailSchema = require('./character-detail-model');
const _ = require('lodash');

//http://comicvine.gamespot.com/api/characters/?api_key=5de7765cd42651ccb9bf0d1a16c8c42d88693d13&filter=name%3APsylocke&format=json
//http://gateway.marvel.com:80/v1/public/characters?name=psylocke&apikey=14a03ab1d130513b2b947672fc11128f


characterDetailSchema.statics.saveCharacterDetail = (data) => {
    data.forEach(function(n) {
      console.log(n.character.id);
      CharacterDetail.findOneAndUpdate( {"character.id": n.character.id}, n, { upsert: true }, function(err,doc) {
        if(err) {
          console.log(err);
        }else{
          console.log( "updated" );
        }
      });

    });
};

characterDetailSchema.statics.saveMarvelApiCharacter = (data) => {
  data.forEach(function(n) {
    console.log(n.character.id);
    CharacterDetail.findOneAndUpdate( {"character.id": n.character.id}, n, { upsert: true }, function(err,doc) {
      if(err) {
        console.log(err);
      }else{
        console.log( "updated" );
      }
    });

  });
};



const CharacterDetail  = mongoose.model('CharactersDetails', characterDetailSchema,"charactersdetails");
module.exports = CharacterDetail;
