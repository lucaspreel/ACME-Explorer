'use strict'
const mongoose = require('mongoose') 
const Schema = mongoose.Schema

const StageSchema = new Schema({
    title: {
      type: String,
      required: 'Kindly enter the title of the comment'
    },
    description: {
      type: String
    },
    price: {
      type: Double,
      // TODO: digitos
    }
  }, { strict: false })

const TripSchema = new Schema({
  ticker: {
    type: String,
    required: 'Kindly enter the actor name'
  },
  title: { 
    type: String, 
    required: 'Kindly enter the actor surname'
  },
  description: { 
    type: String,
    required: 'Kindly enter the actor surname'
  },
  price: {
    type: Double
    //TODO: digitos
  },
  requirements: {
      type:[String]
  },
  start_date: {
      type: Date
  },
  end_date: {
      type: Date
  },
  pictures: {
      type: [{data: Buffer, contentType: String}]
  },
  canceled: {
    type: Boolean
  },
  cancelReason: {
      type: String
  },
  manager_Id: {
    type: Schema.Types.ObjectId,
    required: 'consumer id required'
  },
  application_id: {
    type: Schema.Types.ObjectId,
    required: 'consumer id required'
  },
  stages : [StageSchema]
}, { strict: false })

module.exports = mongoose.model('Trips', TripSchema)