'use strict';
/* ---------------TRIP---------------------- */
const mongoose = require('mongoose');
const Trip = mongoose.model('Trips');
const Stage = mongoose.model('Stage');

// ------------------------------------------------------------------------------
// TRIP'S SECTION
// ------------------------------------------------------------------------------

exports.list_all_trips = function (req, res) {
  const keyword = req.query.keyword;
  console.log('keyword', keyword);

  let filter = {};

  if (typeof keyword !== 'undefined') {
    const amountOfWords = keyword.split(' ').length;

    if (amountOfWords > 1) {
      return res.status(422).send('Error: keyword must be a single word.');
    }

    const reg = new RegExp(keyword);

    filter = {
      $or: [
        { ticker: reg },
        { title: reg },
        { description: reg }
      ]
    };
  }

  Trip.find(filter, function (err, trips) {
    if (err) {
      res.send(err);
    } else {
      res.json(trips);
    }
  });
};

exports.create_a_trip = function (req, res) {
  const newTrip = new Trip(req.body);

  newTrip.save(function (err, trip) {
    if (err) {
      res.send(err);
    } else {
      res.status(201).json(trip);
    }
  });
};

exports.read_a_trip = function (req, res) {
  Trip.findById(req.params.tripId, function (err, trip) {
    if (err) {
      res.send(err);
    } else {
      res.json(trip);
    }
  });
};

exports.update_a_trip = function (req, res) {
  Trip.findOneAndUpdate({ _id: req.params.tripId }, req.body, { new: true }, function (err, trip) {
    if (err) {
      res.send(err);
    } else {
      res.json(trip);
    }
  });
};

exports.delete_a_trip = function (req, res) {
  Trip.deleteOne({ _id: req.params.tripId }, function (err, trip) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: 'Trip successfully deleted' });
    }
  });
};

exports.cancel_a_trip = function (req, res) {
  const fieldsToUpdate = req.body;

  if (!Object.prototype.hasOwnProperty.call(fieldsToUpdate, 'cancelReason')) {
    return res.status(422).send('Error: cancelReason is mandatory for this operation.');
  }

  fieldsToUpdate.canceled = true;

  Trip.findOneAndUpdate({ _id: req.params.tripId }, fieldsToUpdate, { new: true }, function (err, trip) {
    if (err) {
      res.send(err);
    } else {
      res.json(trip);
    }
  });
};

exports.publish_a_trip = function (req, res) {

  const fieldsToUpdate = {
    publicationDate: Date.now()
  };

  Trip.findOneAndUpdate({ _id: req.params.tripId }, fieldsToUpdate, { new: true }, function (err, trip) {
    if (err) {
      res.send(err);
    } else {
      res.json(trip);
    }
  });
};
