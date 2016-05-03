"use strict";

const CharacterDetailDao = require('./character-detail-dao');

module.exports = class CharacterDetailController {
  static getCharacterDetail(req, res) {
    let _charId = req.params.characterId;
    CharacterDetailDao.getCharacterDetail(_charId)
      .then((charDetail) => res.status(200).json(charDetail))
      .catch(error => res.status(400).json(error));
  }

};
