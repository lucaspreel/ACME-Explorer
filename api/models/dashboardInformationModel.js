'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationsRatioPerStatusSchema = new Schema({
  status: {
    type: String,
    enum: ['PENDING', 'DUE', 'ACCEPTED', 'CANCELLED', 'REJECTED']
  },
  ratio: {
    type: Number
  }
}, { strict: false });

const DispersionMeasuresSchema = new Schema({
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

const DashboardInformationSchema = new Schema({
  tripsPerManager: { DispersionMeasuresSchema },
  applicationsPerTrip: { DispersionMeasuresSchema },
  priceOfTrips: { DispersionMeasuresSchema },
  applicationsRatioPerStatus: [ApplicationsRatioPerStatusSchema],
  computationMoment: {
    type: Date,
    default: Date.now
  },
  rebuildPeriod: {
    type: String
  }
}, { strict: false });

DashboardInformationSchema.index({ computationMoment: -1 });

module.exports = mongoose.model('ApplicationsRatioPerStatus', ApplicationsRatioPerStatusSchema);
module.exports = mongoose.model('DispersionMeasures', DispersionMeasuresSchema);
module.exports = mongoose.model('DashboardInformation', DashboardInformationSchema);
