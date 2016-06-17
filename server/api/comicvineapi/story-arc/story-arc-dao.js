"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const storyArcSchema = require('./story-arc-model');
const _ = require('lodash');

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




const StoryArcDetail  = mongoose.model('StoryArcs', storyArcSchema,"storyarcs");
module.exports = StoryArcDetail;
