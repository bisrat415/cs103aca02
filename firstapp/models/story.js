'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const storySchema = new Schema({
  topic: String,
  story: String,
  date: Date,
});

module.exports = mongoose.model('Story', storySchema);;