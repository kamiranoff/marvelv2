"use strict";

/**
 *
 * @type Schema
 *var schema = new Schema({
  name:    String,
  binary:  Buffer,
  living:  Boolean,
  updated: { type: Date, default: Date.now },
  age:     { type: Number, min: 18, max: 65 },
  mixed:   Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  array:      [],
  ofString:   [String],
  ofNumber:   [Number],
  ofDates:    [Date],
  ofBuffer:   [Buffer],
  ofBoolean:  [Boolean],
  ofMixed:    [Schema.Types.Mixed],
  ofObjectId: [Schema.Types.ObjectId],
  nested: {
    stuff: { type: String, lowercase: true, trim: true }
  }
})

 **/

const mongoose = require('mongoose');

const _comicvineCharSchema = {
  "aliases": String,
  "api_detail_url": String,
  "birth": Date,
  "count_of_issue_appearances": Number,
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
  "gender": Number,
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
  "origin": {
    "api_detail_url": String,
    "id": Number,
    "name": String
  },
  "publisher": {
    "api_detail_url": String,
    "id": Number,
    "name": String
  },
  "real_name": String,
  "site_detail_url": String
};

module.exports = mongoose.Schema(_comicvineCharSchema);
