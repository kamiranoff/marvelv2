"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const storyArcSchema = require('./story-arc-model');
const _ = require('lodash');
const fieldsToRetreive = '';
//http://comicvine.gamespot.com/api/story-arcs/?api_key=5de7765cd42651ccb9bf0d1a16c8c42d88693d13&filter=name%3APsylocke&format=json
//http://gateway.marvel.com:80/v1/public/characters?name=psylocke&apikey=14a03ab1d130513b2b947672fc11128f


storyArcSchema.statics.saveMoreStoryArc = (data) => {
  var count = 0;
  data.forEach(function(n) {
    StoryArcDetail.findOneAndUpdate( {"story_arc.id": n.story_arc.id}, n, { upsert: true }, function(err,doc) {
      if(err) {
        console.log(err);
      }else{
        count++;
        console.log( "updated",count);
      }
    });

  });
};

storyArcSchema.statics.saveStoryArc = (data) => {
  var count = 0;
  data.forEach(function(n) {
    StoryArcDetail.findOneAndUpdate( {"story_arc.id": n.story_arc.id}, n, { upsert: true }, function(err,doc) {
      if(err) {
        console.log(err);
      }else{
        count++;
        console.log( "updated",count);
      }
    });

  });
};


storyArcSchema.statics.getAllStories = () => {
  console.log('getting all stories');
  return new Promise((resolve, reject) => {
    let _query = {'story_arc.publisher.name':'Marvel'};
    let fields = fieldsToRetreive;

    StoryArcDetail
      .find(_query,fields)
      .sort({ "story_arc.name": 1 })
      .limit(100)
      .exec((err, stories) => {
        console.log('ERROR',err);
        if(err){ reject(err)}else{
          resolve(stories);
        }
      });
  });
};




storyArcSchema.statics.getMoreStories = (lastStoryName,qty) => {
  var qty = parseInt(qty);
  return new Promise((resolve, reject) => {

    let _query = {
      "story_arc.name": { "$gt": lastStoryName },
      'story_arc.publisher.name':'Marvel'
    };
    let fields = fieldsToRetreive;

    if (!_.isNumber(qty)) {
      return reject(new TypeError('is not a valid number.'));
    }
    StoryArcDetail
      .find(_query,fields)
      .sort({ "story_arc.name": 1 })
      .limit(qty)
      .exec((err, stories) => {

        if(err){ reject(err)}else{
          resolve(stories);
        }
      });
  });
};


storyArcSchema.statics.getStoryByName = (input) => {
  console.log("input", input);
  return new Promise((resolve, reject) => {
    if (!_.isString(input)) {
      return reject(new TypeError('is not a valid string.'));
    }
    let _query = {
      "story_arc.name": {"$regex": input, "$options": "i"},
      'story_arc.publisher.name': 'Marvel'
    };
    let fields = fieldsToRetreive;
    StoryArcDetail
      .find(_query, fields)
      .exec((err, stories) => {
        if (err) {
          reject(err)
        } else {
          resolve(stories);
        }
      });
  });
}

const StoryArcDetail  = mongoose.model('StoryArcs', storyArcSchema,"storyarcs");
module.exports = StoryArcDetail;
