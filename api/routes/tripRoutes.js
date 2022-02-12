'use strict'
module.exports = function (app) {
  const trips = require('../controllers/tripController')

  app.route('/v1/trips')
    .get(trips.list_all_trip)
    .post(trips.create_an_trip)

  app.route('/v1/trips/:tripId')
    .get(trips.read_a_trip)
    .put(trips.update_a_trip)
    .delete(trips.delete_a_trip)

  app.route('/v1/stages')
    .get(trips.list_all_stage)
    .post(trips.create_a_stage)

  app.route('/v1/stages/:stageId')
    .get(trips.read_a_stage)
    .put(trips.update_a_stage)
    .delete(trips.delete_a_stage)
}