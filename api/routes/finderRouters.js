'use strict';
module.exports = function (app) {
  const actors = require('../controllers/finderController');

  app.route('/v1/finder')
    .get(application.list_all_finder)
    .post(application.create_an_finder);
};
