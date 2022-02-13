'use strict';
/* ---------------Application---------------------- */
const mongoose = require('mongoose');
const Application = mongoose.model('Application');

exports.list_all_application = function(req, res) {
  Application.find({deleted: false}, function(err, application) {
    if (err) {
      res.send(err);
    } else {
      res.json(Application);
    }
  });
};

exports.create_an_application = function(req, res) {

  const newApplication = new Application(req.body);

  newApplication.status = 'PENDING';

  newApplication.save(function(err, application) {
    if (err) {
      res.send(err);
    } else {
      res.json(Application);
    }
  });
};

exports.delete_an_application = function(req, res) {
  Application.deleteOne({_id: req.params.applicationId}, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.json({message: 'Trip successfully deleted'});
    }
  });
};
