const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');

const Actor = require('./api/models/actorModel');
const Sponsorship = require('./api/models/sponsorShipModel');
const SystemParameters = require('./api/models/systemParametersModel');
const Trip = require('./api/models/tripModel');
const Application = require('./api/models/applicationModel');
const Finder = require('./api/models/finderModel');
const DashboardInformation = require('./api/models/dashboardInformationModel');
const DashboardInformationTools = require('./api/controllers/dashboardInformationController');

const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: true }));
express.urlencoded({ extended: true })
app.use(bodyParser.json({limit: '300mb'}));
app.use(express.urlencoded({limit: '300mb', extended: true}));

// swagger documentation config - start
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const swaggerSpec = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Acme Explorer Api',
      version: '1.0.0'
    }
  },
  apis: [
      `${path.join(__dirname, './app.js')}`,
      `${path.join(__dirname, './api/routes/actorRoutes.js')}`,
      `${path.join(__dirname, './api/routes/sponsorshipRoutes.js')}`,
      `${path.join(__dirname, './api/routes/systemParametersRoutes.js')}`,
      `${path.join(__dirname, './api/routes/applicationRoutes.js')}`,
      `${path.join(__dirname, './api/routes/dashboardInformationRoutes.js')}`
  ]
};

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

const routesActors = require('./api/routes/actorRoutes');
const routesSponsorships = require('./api/routes/sponsorshipRoutes');
const routesSystemParameters = require('./api/routes/systemParametersRoutes');
const routesApplication = require('./api/routes/applicationRoutes');
const routesDashboardInformation = require('./api/routes/dashboardInformationRoutes');

routesActors(app);
routesSponsorships(app);
routesSystemParameters(app);
routesApplication(app);
routesDashboardInformation(app);

// MongoDB URI building
const mongoDBUser = process.env.mongoDBUser || 'ACME_EXPLORER_ADMIN_USER';
const mongoDBPass = process.env.mongoDBPass || '$3CUR3p455W0RDZOZZ';
const mongoDBCredentials = (mongoDBUser && mongoDBPass) ? mongoDBUser + ':' + mongoDBPass + '@' : '';

const mongoDBHostname = process.env.mongoDBHostname || 'localhost';
const mongoDBPort = process.env.mongoDBPort || '27017';
const mongoDBName = process.env.mongoDBName || 'ACME-Explorer';

const mongoDBURI = 'mongodb://' + mongoDBCredentials + mongoDBHostname + ':' + mongoDBPort + '/' + mongoDBName;

mongoose.set('debug', true); // util para ver detalle de las operaciones que se realizan contra mongodb

// mongoose.connect(mongoDBURI)
mongoose.connect(mongoDBURI, {
  // reconnectTries: 10,
  // reconnectInterval: 500,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // skip trying IPv6
});
console.log('Connecting DB to: ' + mongoDBURI);

mongoose.connection.on('open', function () {
  app.listen(port, function () {
    console.log('ACME-Explorer RESTful API server started on: ' + port);
  });
});

mongoose.connection.on('error', function (err) {
  console.error('DB init error ' + err);
});
console.log("Let's create dashboard");
DashboardInformationTools.createDashboardInformationJob();
console.log("Dashboard created");