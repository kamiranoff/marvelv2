"use strict";

const mongoose = require('mongoose');

const _comicsSchema = {

};


module.exports = mongoose.Schema(_comicsSchema).index({dates:1});
