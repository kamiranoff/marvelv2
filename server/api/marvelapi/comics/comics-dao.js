"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const comicsSchema = require('./comic-model');
const _ = require('lodash');



comicsSchema.statics.getAll = () => {
  return new Promise((resolve, reject) => {
    let _query = {};
    let fields = 'comic.thumbnail comic.title comic.dates';

    Comics
      .find(_query,fields)
      .sort({ "comic.title": 1 })
      .limit(100)
      .exec((err, comics) => {
        if(err){
          reject(err);
          console.log("err",err);
        }else{
          resolve(comics);
        }
      });
  });
};

comicsSchema.statics.getMoreComics = (lastid,qty) => {
  var qty = parseInt(qty);
  return new Promise((resolve, reject) => {
    let _query = { "_id": { "$gt": lastid }};
    let fields = 'comic.thumbnail comic.title comic.dates';
    if (!_.isNumber(qty)) {
      return reject(new TypeError('is not a valid number.'));
    }
    Comics
      .find(_query,fields)
      .sort({ "_id": 1 })
      .limit(qty)
      .exec((err, comics) => {
        if(err){ reject(err)}else{
          resolve(comics);
        }
      });
  });
};

comicsSchema.statics.getComicsByTitle = (input) => {
  return new Promise((resolve, reject) => {
    if (!_.isString(input)) {
      return reject(new TypeError('is not a valid string.'));
    }
    let _query = { "comic.title": { "$regex": input, "$options": "i" }};
    let fields = 'comic.thumbnail comic.title comic.dates';
    Comics
      .find( _query ,fields)
      .limit(100)
      .exec((err, comics) => {
        if(err){
          reject(err)
        }else{
          resolve(comics);
        }
      });
  });
};

comicsSchema.statics.getMoreComicsFromSearch = (searchTerm,lastid,qty) => {
  return new Promise((resolve, reject) => {
    let _query = { "comic.title": { "$regex": searchTerm, "$options": "i" }, "_id": { "$gt": lastid }};
    let fields = 'comic.thumbnail comic.title comic.dates';

    Comics
      .find(_query,fields)
      .sort({ "_id": 1 })
      .limit(qty)
      .exec((err, comics) => {
        if(err){ reject(err)}else{
          resolve(comics);
        }
      });
  });
};


const Comics  = mongoose.model('Comics', comicsSchema,"comics");
module.exports = Comics;
