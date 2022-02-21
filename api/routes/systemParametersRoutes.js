'use strict'
module.exports = function (app) {

  const systemParameters = require('../controllers/systemParametersController')

  app.route('/v1/systemParameters')

  /**
   * @swagger
   * /v1/systemParameters:
   *    post:
   *      summary: Create system parameters
   *      tags: [SystemParameters]
   *      requestBody:
   *        required: false
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              $ref: '#/components/schemas/SystemParameters'
   *      responses:
   *        201: 
   *          description: System parameters created.
   *        400: 
   *          description: Error trying to create the system parameters. Bad Request.
   *        403: 
   *          description: You don't have right role to carry out this operation.
   *        409:
   *          description: System parameters already exist.
   *        500: 
   *          description: Error trying to create the system parameters.
   */
    .post(systemParameters.create_system_parameters)

  /**
   * @swagger
   * /v1/systemParameters:
   *    get:
   *      summary: Return system parameters.
   *      tags: [SystemParameters]
   *      responses:
   *        200: 
   *          description: System parameters successfully retrieved.
   *          content: 
   *            application/json:
   *              schema:
   *                type: Object
   *                items:
   *                $ref: '#/components/schemas/SystemParameters'
   *        500: 
   *          description: Error trying to get system parameters.
   */
    .get(systemParameters.read_system_parameters)

   /**
   * @swagger
   * /v1/systemParameters:
   *    put:
   *      summary: Update system parameters.
   *      tags: [SystemParameters]
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              $ref: '#/components/schemas/SystemParameters'
   *      responses:
   *        200: 
   *          description: System parameters successfully updated.
   *          content: 
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/components/schemas/SystemParameters'
   *        403: 
   *          description: You don't have right role to carry out this operation.
   *        404: 
   *          description: System parameters not found.
   *        500: 
   *          description: Error trying to update the system parameters.
   */
    .put(systemParameters.update_system_parameters)
}
