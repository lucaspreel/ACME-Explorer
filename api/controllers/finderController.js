'use strict';
/* ---------------Finder---------------------- */
const mongoose = require('mongoose');
const Finder = mongoose.model('Finder');

exports.list_all_finder = function(req, res) {
  Finder.find({deleted: false}, function(err, application) {
    if (err) {
      res.send(err);
    } else {
      res.json(Application);
    }
  });
};

exports.create_an_finder = function(req, res) {

  const newApplication = new Application(req.body);


  newApplication.save(function(err, finder) {
    if (err) {
      res.send(err);
    } else {
      res.json(Application);
    }
  });
};