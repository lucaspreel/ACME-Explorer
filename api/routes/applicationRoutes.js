'use strict';
module.exports = function (app) {
  const actors = require('../controllers/actorController');

  app.route('/v1/applications')
    .get(application.list_all_application)
    .post(application.create_an_application);

  app.route('/v1/applications/:applicationId')
    .delete(application.delete_an_application);
};
