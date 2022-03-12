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
  Trip.findOneAndUpdate({ _id: req.params.tripId }, req.body, { new: true }, function (err, trip) {
    if (err) {
      res.send(err);
    } else {
      res.json(trip);
    }
  });
};

exports.publish_a_trip = function (req, res) {
  Trip.findOneAndUpdate({ _id: req.params.tripId }, req.body, { new: true }, function (err, trip) {
    if (err) {
      res.send(err);
    } else {
      res.json(trip);
    }
  });
};

// ------------------------------------------------------------------------------
// STAGES' SECTION
// ------------------------------------------------------------------------------

exports.list_all_stages = function (req, res) {
  Stage.find({}, function (err, stages) {
    if (err) {
      res.send(err);
    } else {
      res.json(stages);
    }
  });
};

exports.create_a_stage = function (req, res) {
  const newStage = new Stage(req.body);

  newStage.save(function (err, stage) {
    if (err) {
      res.send(err);
    } else {
      res.json(stage);
    }
  });
};

exports.read_a_stage = function (req, res) {
  Stage.findById(req.params.stageId, function (err, stage) {
    if (err) {
      res.send(err);
    } else {
      res.json(stage);
    }
  });
};

exports.update_a_stage = function (req, res) {
  Stage.findOneAndUpdate({ _id: req.params.stageId }, req.body, { new: true }, function (err, stage) {
    if (err) {
      res.send(err);
    } else {
      res.json(stage);
    }
  });
};
exports.delete_a_stage = function (req, res) {
  Stage.deleteOne({ _id: req.params.tripId }, function (err, stage) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: 'Stage successfully deleted' });
    }
  });
};
