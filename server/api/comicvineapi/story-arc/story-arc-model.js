
const mongoose = require('mongoose');
const _storyArcSchema = {
  "story_arc": {
    "aliases": String,
    "api_detail_url": String,
    "count_of_isssue_appearances": Number,
    "date_added": Date,
    "date_last_updated": Date,
    "deck": String,
    "description": String,
    "first_appeared_in_issue": {
      "api_detail_url": String,
      "id": Number,
      "name": String,
      "issue_number": String
    },
    "first_appeared_in_episode": {
      "api_detail_url": String,
      "id": Number,
      "name": String,
      "episode_number": String
    },
    "id": Number,
    "image": {
      "icon_url": String,
      "medium_url": String,
      "screen_url": String,
      "small_url": String,
      "super_url": String,
      "thumb_url": String,
      "tiny_url": String
    },
    "name": String,
    "publisher": {
      "api_detail_url": String,
      "id": Number,
      "name": String,
      "site_detail_url": String
    },
    "site_detail_url": String
  }
  };

module.exports = mongoose.Schema(_storyArcSchema);
