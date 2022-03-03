'use strict';
/* ---------------DASHBOARD INFORMATION---------------------- */
const mongoose = require('mongoose');
const DashboardInformation = mongoose.model('DashboardInformation');

exports.read_all_dashboards = function (req, res) {
  console.log('read_all_dashboards');
};

exports.rebuild_period = function (req, res) {
  console.log('rebuild period');
};

exports.read_last_dashboard = function (req, res) {
  console.log('read last dashboards');
};
