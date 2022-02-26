'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  applicationMoment: {
    type: Date
  },
  comments: {
    type: String,
    required: 'Kindly enter the comments of the application'
  },
  status: [{
    type: String,
    default: 'PENDING',
    enum: ['PENDING', 'DUE', 'ACCEPTED', 'CANCELLED', 'REJECTED']
  }],
  explorer_Id: {
    type: Schema.Types.ObjectId,
    required: 'explorer id required'
  },
  trip_Id: {
    type: Schema.Types.ObjectId,
    required: 'trip id required'
  },
  rejected_reason: {
    type: String
  },
  tripPrice: {
    type: Number
  }

}, { strict: false });

module.exports = mongoose.model('Application', ApplicationSchema);
