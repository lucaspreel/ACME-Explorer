'use strict'
module.exports = function (app) {
  const sponsorships = require('../controllers/sponsorshipController')

  app.route('/v1/sponsorships')
    .post(sponsorships.create_a_sponsorship)
    .get(sponsorships.list_all_sponsorships)
  
  app.route('/v1/sponsorships/:sponsorshipId')  
    .get(sponsorships.read_a_sponsorship)
    .put(sponsorships.update_a_sponsorship)
    .delete(sponsorships.delete_a_sponsorship)

  app.route('/v1/sponsorships/:sponsorshipId/pay')
    .path(sponsorships.pay_a_sponsorship)
}
