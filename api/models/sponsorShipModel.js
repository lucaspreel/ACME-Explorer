'use strict'
const mongoose = require('mongoose') 
const Schema = mongoose.Schema

const SponsorshipSchema = new Schema({
  banner: {
    data: Buffer, contentType: String
  },
  page: { 
    type: String
  },
  tripTicker: {
    type: String
  },
  isPayed: {
    type: Boolean,
    default: false
  },
  sponsor_Id: {
    type: Schema.Types.ObjectId,
    required: 'sponsor id required'
  }

}, { strict: false })

module.exports = mongoose.model('Sponsorship', SponsorshipSchema)