"use strict";

const CharactersController = require('./characters-controller');
const CharacterDetailController = require('./character-detail-controller');
const CharactersCategoriesController = require('./characters-categories-controller');

module.exports = class MarvelRoutes {
  static init(router) {
    router.route('/api/marvelapi/characters')
      .get(CharactersController.getCharacters);

    router
      .route('/api/marvelapi/character/:characterId')
      .get(CharacterDetailController.getCharacterDetail);

    router
      .route('/api/marvelapi/categories')
      .get(CharactersCategoriesController.getCategories);
  }
}
