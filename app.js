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

/**
 * @swagger
 * components:
 *  schemas:
 *    Actor:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: The actor name.
 *        surname:
 *          type: string
 *          description: The actor surname.
 *        email:
 *          type: string
 *          description: The actor email.
 *        language:
 *          type: string
 *          description: The actor language.
 *        phone_number:
 *          type: string
 *          description: The actor phone number.
 *        address:
 *          type: string
 *          description: The actor address.
 *        role:
 *          type: string
 *          description: The actor role.
 *      required:
 *        - name
 *        - surname
 *        - email
 *        - language
 *        - phone_number
 *        - address
 *        - role
 *      example:
 *        name: John Charles
 *        surname: Road Grandson
 *        email: jcrg@jcrg.com
 *        language: SPANISH
 *        phone_number: 123456789
 *        address: The world is my playground
 *        role: ADMINISTRATOR
 *        isActive: true
 *    SystemParameters:
 *      type: object
 *      properties:
 *        maxFinderResults:
 *          type: number
 *          description: The number of results that a finder will return.
 *        flatRateSponsorships:
 *          type: number
 *          description: The flat rate for sponsorships.
 *        cacheHour:
 *          type: number
 *          description: The number of hours the system keep data in cache.
 *      required:
 *        - maxFinderResults
 *        - flatRateSponsorships
 *        - cacheHour
 *      example:
 *        maxFinderResults: 25
 *        flatRateSponsorships: 0 
 *        cacheHour: 2
 *    Sponsorship:
 *      type: object
 *      properties:
 *        sponsor_Id:
 *          type: object
 *          description: The id of the sponsor making this sponsorship.
 *        tripTicker:
 *          type: string
 *          description: The ticker of the trip sponsored.
 *        banner:
 *          type: image
 *          description: The banner of the sponsor.
 *        page:
 *          type: string
 *          description: The url of the page of the sponsor.
 *        isPayed:
 *          type: boolean
 *          description: Indicate if the sponsor payed for this sponsorship.
 *      required:
 *        - sponsor_Id
 *        - tripTicker
 *        - banner
 *        - page
 *      example:
 *        sponsor_Id: The id of a sponsor registered in the system.
 *        tripTicker: 220722-FUJN
 *        banner: A wonderful banner 
 *        page: https://an-amazing-sponsor.com
 */

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