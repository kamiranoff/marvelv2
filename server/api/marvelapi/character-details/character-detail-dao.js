'use strict';

const mongoose = require('mongoose');
const characterDetailSchema = require('./character-detail-model');

//http://comicvine.gamespot.com/api/characters/?api_key=5de7765cd42651ccb9bf0d1a16c8c42d88693d13&filter=name%3APsylocke&format=json
//http://gateway.marvel.com:80/v1/public/characters?name=psylocke&apikey=14a03ab1d130513b2b947672fc11128f

characterDetailSchema.statics.saveMoreCharacterDetail = (data) => {
  console.log('saving More Character Details');
  var count = 0;
  data.forEach(function(n) {
    CharacterDetail.findOneAndUpdate({ 'character.id': n.character.id }, n, { upsert: true }, function(err) {
      if (err) {
        console.log(err);
      } else {
        count++;
        console.log('updated', count);
      }
    });
  });
};

characterDetailSchema.statics.saveCharacterDetail = (data) => {
  var count = 0;
  data.forEach(function(n) {
    CharacterDetail.findOneAndUpdate({ 'character.id': n.character.id }, n, { upsert: true }, function(err) {
      if (err) {
        console.log('saveCharacterDetail - Could not findOneAndUpdate', err);
      } else {
        count++;
        console.log('saveCharacterDetail - Number of characters updated:', count);
      }
    });
  });
};

const CharacterDetail = mongoose.model('CharactersDetails', characterDetailSchema, 'charactersdetails');
module.exports = CharacterDetail;
