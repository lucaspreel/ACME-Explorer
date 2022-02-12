const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const mongoose = require('mongoose')

const Actor = require('./api/models/actorModel')
//const Item = require('./api/models/itemModel')

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
 *        
 */

//swagger documentation config - end

const routesActors = require('./api/routes/actorRoutes')
//const routesItems = require('./api/routes/itemRoutes')

routesActors(app)
//routesItems(app)

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