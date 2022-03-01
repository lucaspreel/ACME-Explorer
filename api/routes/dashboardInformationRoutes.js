'use strict';
module.exports = function (app) {
  const dataWareHouse = require('../controllers/dashboardInformationController');

  app.route('/dashboardInformation')
    .get(dataWareHouse.read_dashboard_information)
    .post(dataWareHouse.compute_dashboard_information);
};
