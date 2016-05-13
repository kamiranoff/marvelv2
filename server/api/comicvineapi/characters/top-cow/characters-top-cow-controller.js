"use strict";

const CharactersTopCowDao = require('./characters-top-cow-dao');

module.exports = class CharactersTopCowController {
  static getAppearances(req,res){
    CharactersTopCowDao.getAllNamesAndAppearancesFromTopCow()
      .then(characters => res.status(200).json(characters))
      .catch(error => res.status(400).json(error));
  }
  static getCharacters(req, res) {
    if(req.query.name){
      CharactersTopCowDao.getCharactersByNameFromTopCow(req.query.name)
        .then(characters => res.status(200).json(characters))
        .catch(error => res.status(400).json(error));

    }else if(req.query.lastName && req.query.qty){
      CharactersTopCowDao.getMoreCharactersFromTopCow(req.query.lastName,req.query.qty)
        .then(characters => res.status(200).json(characters))
        .catch(error => res.status(400).json(error));
    }else{
      CharactersTopCowDao.getAllFromTopCow()
        .then(characters => res.status(200).json(characters))
        .catch(error => res.status(400).json(error));

    }
  }
};
