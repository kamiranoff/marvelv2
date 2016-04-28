"use strict";

const CharactersController = require('./characters/characters-controller');




module.exports = class ComicvineRoutes {

  static init(router) {
    router.route('/api/comicvine/characters')
      .get(CharactersController.getCharacters);
  }

};
