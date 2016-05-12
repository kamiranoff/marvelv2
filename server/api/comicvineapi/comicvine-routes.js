"use strict";

const CharactersController = require('./characters/marvel/characters-controller');
const CharactersDCController = require('./characters/dc/characters-dc-controller');
const CharactersTopCowController = require('./characters/top-cow/characters-top-cow-controller');
const CharacterDetailController = require('./character-detail/character-detail-controller');



module.exports = class ComicvineRoutes {

  static init(router) {
    //Marvel
    router.route('/api/comicvine/marvel/characters')
      .get(CharactersController.getCharacters);

    router.route('/api/comicvine/marvel/appearances')
      .get(CharactersController.getAppearances);


    //DC
    router.route('/api/comicvine/dc/characters')
      .get(CharactersDCController.getCharacters);



    //TopCow
    router.route('/api/comicvine/top-cow/characters')
      .get(CharactersTopCowController.getCharacters);

    router
      .route('/api/comicvine/character/:characterId')
      .get(CharacterDetailController.getCharacterDetail);

  }



};
