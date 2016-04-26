"use strict";
const ComicsSeriesDAO = require('./comics-series-dao');

module.exports = class ComicsSeriesController {
  static getSeries(req, res) {
    ComicsSeriesDAO.getAll()
      .then(series => res.status(200).json(series))
      .catch(error => res.status(400).json(error));
  }
};
