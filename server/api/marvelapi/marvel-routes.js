"use strict";

const CharactersController = require('./characters/characters-controller');
const CharacterDetailController = require('./characters/character-detail-controller');
const CharactersCategoriesController = require('./characters/characters-categories-controller');
const CharactersDetailsController = require('./character-details/character-detail-controller');

const ComicsController = require('./comics/comics-controller');
const ComicsSeriesController = require('./comics/comics-series-controller');

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

    router
      .route('/api/marvelapi/comics')
      .get(ComicsController.getComics);

    router
      .route('/api/marvelapi/comics/series')
      .get(ComicsSeriesController.getSeries);

    router
    .route('/api/marvelapi/characters-details/:name')
    .get(CharactersDetailsController.getCharFromComivine);


  }


};
