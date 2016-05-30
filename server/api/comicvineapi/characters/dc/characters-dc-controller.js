"use strict";

const CharactersDCDao = require('./characters-dc-dao');

module.exports = class CharactersDCController {
  static getAppearances(req,res){
    CharactersDCDao.getAllNamesAndAppearancesFromDC()
      .then(characters => res.status(200).json(characters))
      .catch(error => res.status(400).json(error));
  }
  static getCharacters(req, res) {
    if(req.query.name){
      CharactersDCDao.getCharactersByNameFromDC(req.query.name)
        .then(characters => res.status(200).json(characters))
        .catch(error => res.status(400).json(error));

    }else if(req.query.lastName && req.query.qty){
      console.log('req.query.qty',req.query.qty);
      CharactersDCDao.getMoreCharactersFromDC(req.query.lastName,req.query.qty)
        .then(characters => res.status(200).json(characters))
        .catch(error => res.status(400).json(error));
    }else{
      CharactersDCDao.getAllFromDC()
        .then(characters => res.status(200).json(characters))
        .catch(error => res.status(400).json(error));

    }
  }
}
