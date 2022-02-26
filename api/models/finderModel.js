'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FinderSchema = new Schema({
  keyWord: {
    type: String,
    required: 'Kindly enter the actor surname'
  },
  priceLowerBound: {
    type: Number
  },
  priceUpperBound: {
    type: Number
  },
  dateLowerBound: {
    type: Date
  },
  dateUpperBound: {
    type: Date
  },
  results: {
    type: [Schema.Types.ObjectId]
  },
  explorer_Id: {
    type: Schema.Types.ObjectId,
    required: 'consumer id required'
  }

}, { strict: false });

module.exports = mongoose.model('Finder', FinderSchema);
