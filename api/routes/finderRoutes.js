'use strict';
module.exports = function (app) {
  const finder = require('../controllers/finderController');

  app.route('/v1/finder')
    .post(finder.create_a_finder);

  app.route('/v1/finder/explorer/:explorerId')
    .get(finder.find_by_explorer_id);  
};
