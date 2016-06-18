"use strict";
//http://comicvine.gamespot.com/api/story_arcs/?api_key=5de7765cd42651ccb9bf0d1a16c8c42d88693d13&filter=name%3APsylocke&format=json

var request = require('request');
const StoryArcDAO = require('./story-arc-dao');

var name ='';
var count = 0;

function saveStoryArc(error, response, body) {
  if (!error && response.statusCode == 200) {
    var result = JSON.parse(body);
    var listOfStoryArc = [];
    var storyArcObject = {};
    for (var i = 0; i < result.results.length; i++) {
      storyArcObject.story_arc = result.results[i];
      console.log(storyArcObject.story_arc.id);
      listOfStoryArc.push(storyArcObject);
      storyArcObject = {};
    }

    StoryArcDAO.saveStoryArc(listOfStoryArc);
    console.log('listOfStoryArc',listOfStoryArc.length);

    if (listOfStoryArc.length >= 100) {

      count = count + 100;
      console.log(count);
      request({
        url: 'http://comicvine.gamespot.com/api/story_arcs/?api_key=5de7765cd42651ccb9bf0d1a16c8c42d88693d13&format=json&offset=' + count + '&filter=name%3A' + name,
        headers: {
          'User-Agent': 'my-encyclopedia marvel'
        }
      }, saveStoryArc);
    }
  }
}


module.exports = class StoryArcController {

  static getStoryArcs(req,res){
    if(req.query.name){
      StoryArcDAO.getStoryByName(req.query.name)
        .then(stories => res.status(200).json(stories))
        .catch(error => res.status(400).json(error));

    }else if(req.query.lastStoryArc && req.query.qty){
      StoryArcDAO.getMoreStories(req.query.lastStoryArc,req.query.qty)
        .then(stories => res.status(200).json(stories))
        .catch(error => res.status(400).json(error));
    }else{
      StoryArcDAO.getAllStories()
        .then(stories => res.status(200).json(stories))
        .catch(error => res.status(400).json(error));

    }
  }

  static getStoryArc(req,res){
    console.log("storyArc - getStoryArc");
    count = 0;
    let _name = req.params.stortyArcName;
    console.log(_name);
    if(_name){
      console.log('name',_name);
      name = _name;
      request(  {
        url: 'http://comicvine.gamespot.com/api/story_arcs/?api_key=5de7765cd42651ccb9bf0d1a16c8c42d88693d13&format=json&filter=name%3A'+ _name,
        headers: {
          'User-Agent': 'my-encyclopedia marvel'
        }
      }, saveStoryArc);

      res.status(200).json({status:_name});
    }
  }


};
