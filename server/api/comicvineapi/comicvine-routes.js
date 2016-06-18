"use strict";

const CharactersController = require('./characters/marvel/characters-controller');
const CharactersDCController = require('./characters/dc/characters-dc-controller');
const CharactersTopCowController = require('./characters/top-cow/characters-top-cow-controller');
const CharacterDetailController = require('./character-detail/character-detail-controller');
const StoryArcController = require('./story-arc/story-arc-controller');


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

    router.route('/api/comicvine/dc/appearances')
      .get(CharactersDCController.getAppearances);


    //TopCow
    router.route('/api/comicvine/top-cow/characters')
      .get(CharactersTopCowController.getCharacters);

    router.route('/api/comicvine/top-cow/appearances')
      .get(CharactersTopCowController.getAppearances);


    //Details

    router
      .route('/api/comicvine/character/:characterId')
      .get(CharacterDetailController.getCharacterDetail);



    //story Arcs
    router
      .route('/api/comicvine/story_arcs/')
      .get(StoryArcController.getStoryArcs);

    router
    .route('/api/comicvine/story_arcs/:stortyArcName')
    .get(StoryArcController.getStoryArc);
  }



};
