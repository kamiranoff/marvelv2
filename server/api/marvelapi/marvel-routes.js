"use strict";

const MarvelController = require('./marvel-controller');

module.exports = class MarvelRoutes {
  static init(router) {
    router
      .route('/api/marvelapi/characters')
      .get(MarvelController.getAll)

    router
      .route("/api/marvelapi/character/:characterId")
      .get(MarvelController.getCharacterDetail)
  }
}
