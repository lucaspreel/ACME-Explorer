'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationsRatioPerStatus = new mongoose.Schema({
  status: {
    type: String,
    enum: ['PENDING', 'DUE', 'ACCEPTED', 'CANCELLED', 'REJECTED']
  },
  ratio: {
    type: Number
  }
}, { strict: false });

const DispersionMeasures = new mongoose.Schema({
  average: {
    type: Number
  },
  minimum: {
    type: Number
  },
  maximum: {
    type: Number
  },
  standardDeviation: {
    type: Number
  }
}, { strict: false });

const DashboardInformationSchema = new mongoose.Schema({
  tripsPerManager: {
    type: Schema.Types.ObjectId,
    ref: 'DispersionMeasures'
  },
  applicationsPerTrip: {
    type: Schema.Types.ObjectId,
    ref: 'DispersionMeasures'
  },
  priceOfTrips: {
    type: Schema.Types.ObjectId,
    ref: 'DispersionMeasures'
  },
  applicationsRatioPerStatus: [{
    type: Schema.Types.ObjectId,
    ref: 'applicationsRatioPerStatus'
  }]
}, { strict: false });

module.exports = mongoose.model('ApplicationsRatioPerStatus', ApplicationsRatioPerStatus);
module.exports = mongoose.model('DispersionMeasures', DispersionMeasures);
module.exports = mongoose.model('DashboardInformation', DashboardInformationSchema);
