"use strict";

const ComicsDao = require('./comics-dao');

module.exports = class ComicsController {
  static getComics(req, res) {
    if(req.query.lastid && req.query.qty && !req.query.title){
      ComicsDao.getMoreComics(req.query.lastid,req.query.qty)
        .then(comics=> res.status(200).json(comics))
        .catch(error => res.status(400).json(error));
    }else if(req.query.lastid && req.query.qty && req.query.title){
      ComicsDao.getMoreComicsFromSearch(req.query.title,req.query.lastid,req.query.qty)
        .then(comics=> res.status(200).json(comics))
        .catch(error => res.status(400).json(error));
    }else if(req.query.title){
      ComicsDao.getComicsByTitle(req.query.title)
        .then(comics=> res.status(200).json(comics))
        .catch(error => res.status(400).json(error));
    }else{
      ComicsDao.getAll()
        .then(comics => res.status(200).json(comics))
        .catch(error => res.status(400).json(error));

    }
  }
}
