const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const mongoose = require('mongoose')

const Actor = require('./api/models/actorModel')
const Sponsorship = require('./api/models/sponsorShipModel')
const SystemParameters = require('./api/models/systemParametersModel')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//swagger documentation config - start
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Acme Explorer Api",
            version: "1.0.0"
        }
    },
    apis: [
      `${path.join(__dirname, "./app.js")}`,
      `${path.join(__dirname, "./api/routes/actorRoutes.js")}`,
      `${path.join(__dirname, "./api/routes/sponsorshipRoutes.js")}`,
      `${path.join(__dirname, "./api/routes/systemParametersRoutes.js")}`,
    ]
};

app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));
//swagger documentation config - end

const routesActors = require('./api/routes/actorRoutes')
const routesSponsorships = require('./api/routes/sponsorshipRoutes')
const routesSystemParameters = require('./api/routes/systemParametersRoutes')

routesActors(app)
routesSponsorships(app)
routesSystemParameters(app)

// MongoDB URI building
const mongoDBHostname = process.env.mongoDBHostname || 'localhost'
const mongoDBPort = process.env.mongoDBPort || '27017'
const mongoDBName = process.env.mongoDBName || 'ACME-Explorer'
const mongoDBURI = 'mongodb://' + mongoDBHostname + ':' + mongoDBPort + '/' + mongoDBName

mongoose.connect(mongoDBURI)
console.log('Connecting DB to: ' + mongoDBURI)

mongoose.connection.on('open', function () {
  app.listen(port, function () {
    console.log('ACME-Explorer RESTful API server started on: ' + port)
  })
})

mongoose.connection.on('error', function (err) {
  console.error('DB init error ' + err)
})