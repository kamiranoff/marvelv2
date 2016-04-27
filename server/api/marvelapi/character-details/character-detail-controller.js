"use strict";
//http://comicvine.gamespot.com/api/characters/?api_key=5de7765cd42651ccb9bf0d1a16c8c42d88693d13&filter=name%3APsylocke&format=json

var request = require('request');
const CharacterDetailDao = require('./character-detail-dao');

const options = {
  url: 'http://comicvine.gamespot.com/api/characters/?api_key=5de7765cd42651ccb9bf0d1a16c8c42d88693d13&filter=name%3APsylocke&format=json',
  headers: {
    'User-Agent': 'my-encyclopedia marvel'
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var result = JSON.parse(body);
    var listOfHerosDetail = [];

    for(var i = 0; i <  result.results.length;i++ ){
      console.log(result.results[i]);
     listOfHerosDetail.push(result.results[i]);
    }

    CharacterDetailDao.saveCharacterDetail(listOfHerosDetail);
  }
}


module.exports = class CharacterDetailController {


  static getCharFromComivine(req,res){
    let _name = req.params.name;
    if(_name){
      console.log('name',_name);
      request(  {
        url: 'http://comicvine.gamespot.com/api/characters/?api_key=5de7765cd42651ccb9bf0d1a16c8c42d88693d13&format=json&filter=name%3A'+ _name,
        headers: {
          'User-Agent': 'my-encyclopedia marvel'
        }
      }, callback);

      res.status(200).json({status:_name});
    }
  }
};
