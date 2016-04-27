"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const characterDetailSchema = require('./character-detail-model');
const _ = require('lodash');

//http://comicvine.gamespot.com/api/characters/?api_key=5de7765cd42651ccb9bf0d1a16c8c42d88693d13&filter=name%3APsylocke&format=json


characterDetailSchema.statics.saveCharacterDetail = (data) => {
  console.log(data.length);
    data.forEach(function(n) {
      CharacterDetail.findOneAndUpdate( {id:n.id}, n, { upsert: true }, function(err,doc) {
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
