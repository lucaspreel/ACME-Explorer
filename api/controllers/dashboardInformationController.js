'use strict';
/* ---------------DASHBOARD INFORMATION---------------------- */
const async = require('async');
const CronJob = require('cron').CronJob;
const CronTime = require('cron').CronTime;
const mongoose = require('mongoose');
const DashboardInformation = mongoose.model('DashboardInformation');
const DispersionMeasures = mongoose.model('DispersionMeasures');
const ApplicationsRatio = mongoose.model('ApplicationsRatio');
const Trip = mongoose.model('Trips');
const Application = mongoose.model('Application');

let rebuildPeriod = '*/10 * * * * *';
let computeDashboardInformationJob;

exports.read_all_dashboards = function (req, res) {
  // if the actor does not have the role  "ADMINISTRATOR"
  // then send error 403
  DashboardInformation.find().sort('-computationMoment').exec(function (err, dashboards) {
    if (err) {
      res.status(500).json({ error: true, message: 'Error trying to get all dashboards.' });
    } else {
      res.status(200).json({ error: false, message: 'Dashboards successfully retrieved.', dashboards });
    }
  });
};

exports.rebuild_period = function (req, res) {
  // if the actor does not have the role  "ADMINISTRATOR"
  // then send error 403
  try {
    rebuildPeriod = req.query.rebuildPeriod;
    computeDashboardInformationJob.setTime(new CronTime(rebuildPeriod));
    computeDashboardInformationJob.start();
    res.status(201).json({ error: false, message: 'Rebuild period successfully defined.', rebuildPeriod });
  } catch (err) {
    res.status(500).json({ error: true, message: 'Error trying to define the rebuild period.' });
  }
};

exports.read_last_dashboard = function (req, res) {
  // if the actor does not have the role  "ADMINISTRATOR"
  // then send error 403
  DashboardInformation.find().sort('-computationMoment').limit(1).exec(function (err, dashboard) {
    if (dashboard.length === 0) {
      res.status(404).send({ error: true, message: 'Dashboard not found.' });
    } else {
      if (err) {
        res.status(500).json({ error: true, message: 'Error trying to get the latest dashboard.' });
      } else {
        res.status(200).json({ error: false, message: ' Latest dashboard successfully retrieved.', dashboard });
      }
    }
  });
};

function createDashboardInformationJob () {
  console.log('Create dashboardInformation');
  computeDashboardInformationJob = new CronJob(rebuildPeriod, function () {
    console.log('Cron job submitted. Rebuild period: ' + rebuildPeriod)
    const newDashboardInformation = new DashboardInformation();
    async.parallel([
      computeTripsPerManager,
      computeApplicationsPerTrip,
      computePriceOfTrips,
      computeApplicationsRatioPerStatus
    ], function (err, results) {
      if (err) {
        console.log('Error computing dashboardInformation: ' + err);
      } else {
        console.log("Results: "+JSON.stringify(results));
        newDashboardInformation.tripsPerManager = results[0];
        newDashboardInformation.applicationsPerTrip = results[1];
        newDashboardInformation.priceOfTrips = results[2];
        newDashboardInformation.applicationsRatioPerStatus = results[3];
        newDashboardInformation.rebuildPeriod = rebuildPeriod;
        console.log("New dashboard : "+newDashboardInformation);

        newDashboardInformation.save(function (err, dashboardInformation) {
          if (err) {
            console.log('Error saving dashboard informations: ' + err);
          } else {
            console.log('new DashboardInformations succesfully saved. Date: ' + new Date());
          }
        });
      }
    });
  }, null, true, 'Europe/Madrid');
}

module.exports.createDashboardInformationJob = createDashboardInformationJob;

function computeTripsPerManager (callback) {
  console.log('enter tripspermanager');
  const tripsPerManager = new DispersionMeasures();
  tripsPerManager.average = 10;
  tripsPerManager.minimum = 5;
  tripsPerManager.maximum = 15;
  tripsPerManager.standardDeviation = 2;
  callback(null, tripsPerManager);
}

function computeApplicationsPerTrip (callback) {
  const applicationsPerTrip = new DispersionMeasures();
  applicationsPerTrip.average = 10;
  applicationsPerTrip.minimum = 5;
  applicationsPerTrip.maximum = 15;
  applicationsPerTrip.standardDeviation = 2;
  callback(null, applicationsPerTrip);
}

function computePriceOfTrips (callback) {
  const priceOfTrips = new DispersionMeasures();
  priceOfTrips.average = 10;
  priceOfTrips.minimum = 5;
  priceOfTrips.maximum = 15;
  priceOfTrips.standardDeviation = 2;
  callback(null, priceOfTrips);
}

function computeApplicationsRatioPerStatus (callback) {
  const applicationsRatioPerStatus = [];
  callback(null, applicationsRatioPerStatus);
}
