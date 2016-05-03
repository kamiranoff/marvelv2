"use strict";

const CharactersController = require('./characters/characters-controller');
const ComicvineCharacterDetailController = require('./character-detail/character-detail-controller');



module.exports = class ComicvineRoutes {

  static init(router) {
    router.route('/api/comicvine/characters')
      .get(CharactersController.getCharacters);

    router
      .route('/api/comicvine/character/:characterId')
      .get(ComicvineCharacterDetailController.getCharacterDetail);
  }

};
