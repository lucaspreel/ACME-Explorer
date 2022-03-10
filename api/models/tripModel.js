'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const dateFormat = require('dateformat');
const customAlphabet = require('nanoid').customAlphabet;
const idGenerator = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 4);

const StageSchema = new Schema({
  title: {
    type: String,
    required: 'Kindly enter the title of the stage'
  },
  description: {
    type: String,
    required: 'Kindly enter the description of the stage'
  },
  price: {
    type: Number,
    required: 'Kindly enter the price of the stage'
  }
}, { strict: false });

const TripSchema = new Schema({
  managerId: {
    type: Schema.Types.ObjectId,
    required: 'manager id required'
  },
  ticker: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /\d{6}-\w{4}/.test(v);
      },
      message: 'ticker is not valid!, Pattern("d(6)-w(4)")'
    }
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
    type: Number
  },
  requirements: {
    type: [String],
    default: []
  },
  startDate: {
    type: Date,
    required: 'Kindly enter the starting date of the trip'
  },
  endDate: {
    type: Date,
    required: 'Kindly enter the ending date of the trip'
  },
  pictures: {
    type: [{ data: Buffer, contentType: String }]
  },
  publicationDate: {
    type: Date
  },
  canceled: {
    type: Boolean,
    default: false
  },
  cancelReason: {
    type: String
  },
  stages: [StageSchema]
}, { strict: false });

TripSchema.pre('save', function (callback) {
  const newTrip = this;

  newTrip.ticker = generateTicker();
  newTrip.price = calculatePrice(newTrip);

  callback();
});

function generateTicker () {
  const currentDate = dateFormat(new Date(), 'yymmdd');
  const ticker = [currentDate, idGenerator()].join('-');
  return ticker;
}

function calculatePrice (trip) {
  let price = 0;
  for (const stage of trip.stages) {
    price += stage.price;
  }
  return price;
}

module.exports = mongoose.model('Trips', TripSchema);
module.exports = mongoose.model('Stage', StageSchema);
