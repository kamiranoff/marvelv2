"use strict";

const MarvelRoutes = require('../api/marvelapi/marvel-routes');
const ComicvineRoutes = require('../api/comicvineapi/comicvine-routes');

const StaticDispatcher = require('../commons/static/index');


module.exports = class Routes {

  static init(app, router) {
    MarvelRoutes.init(router);
    ComicvineRoutes.init(router);

    router
      .route('*')
      .get(StaticDispatcher.sendIndex);

    app.use('/', router);
  }
};
