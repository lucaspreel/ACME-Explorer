'use strict';
/* ---------------DASHBOARD INFORMATION---------------------- */
const mongoose = require('mongoose');
const DashboardInformation = mongoose.model('DashboardInformation');

exports.read_dashboard_information = function (req, res) {
  console.log('read_dashboard_information');
};

exports.compute_dashboard_information = function (req, res) {
  console.log('compute_dashboard_information');
};

