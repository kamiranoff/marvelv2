"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const comicsSchema = require('./comic-model');
const _ = require('lodash');
const StaticDispatcher = require('../../../commons/static/index');



comicsSchema.statics.getAll = () => {



  return new Promise((resolve, reject) => {
    let _query = {};
    let fields = 'comic.series.name';

    ComicsSeries
      .find(_query,fields)
      .exec((err, _result) => {
        if(err){
          reject(err)
        }else{
          var result = Object.keys(_result);


          console.log(_result.length);

          //var arraysOfSeries =  series.map(function(a) {return a.character.wiki.categories;});
          //var result = [].concat.apply([], arraysOfCategories);
          //
          //result = StaticDispatcher.uniq(result);
          //result = result.filter(function(e){return e});//remove falsy values
          //
          //var tmpResult = [];
          //for(var i = 0; i < result.length;i++){
          //  result[i] = result[i].replace(/_/g,' ').replace(/%27/g,'\'');
          //  result[i] = result[i].toLowerCase();
          //  result[i] = result[i].trim();
          //  result[i] = StaticDispatcher.capitalizeFirstLetter(result[i]);
          //  tmpResult.push(result[i]);
          //}
          //
          //result = StaticDispatcher.uniq(tmpResult);
          //result.sort();
          //var arrayOfObjects = [];
          //for(var i = 0; i < result.length;i++){
          //  arrayOfObjects.push({'name':result[i]});
          //}
          //result = arrayOfObjects;
          resolve(result);

        }
      });
  });
};



const ComicsSeries  = mongoose.model('ComicsSeries', comicsSchema,"comics");
module.exports = ComicsSeries;
