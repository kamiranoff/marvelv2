"use strict";

const MarvelDAO = require('./marvel-dao');

module.exports = class MarvelController {
  static getAll(req, res) {
    MarvelDAO
      .getAll()
      .then(characters => res.status(200).json(characters))
      .catch(error => res.status(400).json(error));
  }

  static getCharacterDetail(req, res) {
    let _charId = req.params.characterId;
    console.log('req.params.id',_charId);
    MarvelDAO
      .getCharacterDetail(_charId)
      .then((charDetail) => res.status(200).json(charDetail))
      .catch(error => res.status(400).json(error));
  }

}
