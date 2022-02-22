  'use strict'
  const mongoose = require('mongoose') 
  const Schema = mongoose.Schema

  const StageSchema = new Schema({
      title: {
        type: String,
        required: 'Kindly enter the title of the stage'
      },
      description: {
        type: String
      },
      price: {
        type: Double
      }
    }, { strict: false })

  const TripSchema = new Schema({
    ticker: {
      type: String,
      required: 'Kindly enter the ticker of the trip'
    },
    title: { 
      type: String, 
      required: 'Kindly enter the title of the trip'
    },
    description: { 
      type: String,
      required: 'Kindly enter the title of the trip'
    },
    price: {
      type: Double
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
    publication_date: {
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
      required: 'manager id required'
    },
    application_id: {
      type: Schema.Types.ObjectId,
      required: 'application id required'
    },
    stages : [StageSchema]
  }, { strict: false })

  module.exports = mongoose.model('Trips', TripSchema)
  module.exports = mongoose.model('Stage', StageSchema)