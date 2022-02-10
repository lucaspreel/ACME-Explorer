'use strict'
module.exports = function (app) {

  const actors = require('../controllers/actorController')

  app.route('/v1/actors')
  .get(actors.list_all_actors)
  .post(actors.create_an_actor)

  app.route('/v1/actors/:actorId')
  .get(actors.read_an_actor)
  .put(actors.update_an_actor)

}