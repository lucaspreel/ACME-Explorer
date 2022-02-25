'use strict';
/* ---------------SYSTEM PARAMETERS---------------------- */
const mongoose = require('mongoose');
const SystemParameters = mongoose.model('SystemParameters');

exports.create_system_parameters = function (req, res) {
  // only administrators must be able to do that
  const newSystemParameters = new SystemParameters(req.body);

  newSystemParameters.save(function (err, systemParameters) {
    if (err) {
      res.send(err);
    } else {
      res.json(systemParameters);
    }
  });
};

exports.read_system_parameters = function (req, res) {
  SystemParameters.find({}, function (err, systemParameters) {
    if (err) {
      res.send(err);
    } else {
      res.json(systemParameters);
    }
  });
};

exports.update_system_parameters = function (req, res) {
  // only administrators must be able to do that
  SystemParameters.findOneAndUpdate({ _id: req.params.systemParametersId }, req.body, { new: true }, function (err, systemParameters) {
    if (err) {
      res.send(err);
    } else {
      res.json(systemParameters);
    }
  });
};
