'use strict';
module.exports = function (app) {
  const finder = require('../controllers/finderController');

  app.route('/v1/finder')
    .get(finder.list_all_finder)
    .post(finder.create_an_finder);
};
