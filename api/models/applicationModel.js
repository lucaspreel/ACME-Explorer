'use strict'
const mongoose = require('mongoose') 
const Schema = mongoose.Schema

const ApplicationSchema = new Schema({
  applicationMoment: {
    type: Date
  },
  comments: { 
    type: String, 
    required: 'Kindly enter the actor surname'
  },
  status: [{
    type: String,
    default: 'PENDING',
    enum: ['PENDING', 'DUE', 'ACCEPTED', 'CANCELLED']
  }],
  explorer_Id: {
    type: Schema.Types.ObjectId,
    required: 'consumer id required'
  }

}, { strict: false })

module.exports = mongoose.model('Application', ApplicationSchema)