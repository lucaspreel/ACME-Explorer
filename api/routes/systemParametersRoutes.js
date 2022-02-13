'use strict'
module.exports = function (app) {
  const systemParameters = require('../controllers/systemParametersController')

  app.route('/v1/systemParameters')
    .post(systemParameters.create_system_parameters)
    .get(systemParameters.read_system_parameters)
    .put(systemParameters.update_system_parameters)
}
