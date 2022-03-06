'use strict';
module.exports = function (app) {
  /**
   * @swagger
   * components:
   *  schemas:
   *    Trip:
   *      type: object
   *      properties:
   *        ticker:
   *          type: string
   *          description: The ticker of the trip.
   *        title:
   *          type: string
   *          description: The title of the trip.
   *        description:
   *          type: string
   *          description: The description of the trip.
   *        price:
   *          type: number
   *          description: The price of the trip.
   *        requirements:
   *          type: string
   *          description: The requirements of the trip.
   *        start_date:
   *          type: date
   *          description: The start date of the trip.
   *        end_date:
   *          type: date
   *          description: The end date of the trip.
   *        publication_date:
   *          type: date
   *          description: The publication date of the trip.
   *        pictures:
   *          type: String
   *          description: The pictures of the trip.
   *        canceled:
   *          type: boolean
   *          description: if the trip has been canceled.
   *        cancelReason:
   *          type: String
   *          description: if the trip has been canceled, it must have a reason.
   *        manager_Id:
   *          type: String
   *          description: manager of the trip.
   *        stages:
   *          type: String
   *          description: stages of the trip.
   *        
   *      required:
   *        - ticker
   *        - title
   *        - description
   *        - manager_Id
   * 
   *      example:
   *        ticker: 210322-RVTT
   *        title: Pirineo Aragones
   *        description: Descubre el pirineo aragones en el valle de Ordesa
   *        manager_Id: 6218eca775428925392c633f
   */

  /**
   * @swagger
   * components:
   *  schemas:
   *    Stages:
   *      type: object
   *      properties:
   *        title:
   *          type: string
   *          description: The title of the stage.
   *        description:
   *          type: string
   *          description: The description of the stage.
   *        price:
   *          type: number
   *          description: The price of the stage.
   *        
   *      required:
   *        - title
   * 
   *      example:
   *        title: Pirineo Aragones
   */

  const trips = require('../controllers/tripController');

  app.route('/v1/trips')
  
    /**
     * @swagger
     * /v1/trips:
     *    get:
     *      summary: Returns all trips.
     *      tags: [Trip]
     *      responses:
     *        200:
     *          description: trips successfully retrieved.
     *          content:
     *            application/json:
     *              schema:
     *                type: array
     *                items:
     *                  $ref: '#/components/schemas/Trip'
     *        500:
     *          description: Error trying to get all trips.
     */
    .get(trips.list_all_trip)

    /**
     * @swagger
     * /v1/trips:
     *    post:
     *      summary: Create a new trip
     *      tags: [Trip]
     *      requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#/components/schemas/Trip'
     *      responses:
     *        201:
     *          description: Trip created.
     *        400:
     *          description: Error trying to create the Trip. Bad Request.
     *        403:
     *          description: You don't have right role to carry out this operation. Only managers can create trips.
     *        500:
     *          description: Error trying to create the Trip.
     */
    .post(trips.create_an_trip);

  app.route('/v1/trips/:tripId')

    /**
     * @swagger
     * /v1/trips/{tripId}:
     *    get:
     *      summary: Return a trip.
     *      tags: [Trip]
     *      parameters:
     *        - in: path
     *          name: tripId
     *          schema:
     *            type: string
     *          required: true
     *          description: trip id.
     *      responses:
     *        200:
     *          description: trip successfully retrieved.
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                $ref: '#/components/schemas/trip'
     *        404:
     *          description: trip not found.
     *        500:
     *          description: Error trying to get the trip.
     */
    .get(trips.read_a_trip)

     /**
     * @swagger
     * /v1/trips/{tripId}:
     *    put:
     *      summary: Update a trip.
     *      tags: [Trip]
     *      parameters:
     *        - in: path
     *          name: tripId
     *          schema:
     *            type: string
     *          required: true
     *          description: Trip id.
     *      requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#/components/schemas/Trip'
     *      responses:
     *        200:
     *          description: Trip successfully updated.
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                $ref: '#/components/schemas/Trip'
     *        403:
     *          description: You don't have right role to carry out this operation. Only a manager can update it.
     *        404:
     *          description: Trip not found.
     *        500:
     *          description: Error trying to update the trip.
     */
    .put(trips.update_a_trip)

    /**
     * @swagger
     * /v1/trips/{tripId}:
     *    delete:
     *      summary: Delete a trip.
     *      tags: [Trip]
     *      parameters:
     *        - in: path
     *          name: tripId
     *          schema:
     *            type: string
     *          required: true
     *          description: Trip id.
     *      responses:
     *        200:
     *          description: Trip successfully deleted.
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                $ref: '#/components/schemas/Trip'
     *        403:
     *          description: You don't have right role to carry out this operation. Only a manager can delete it.
     *        404:
     *          description: Trip not found.
     *        500:
     *          description: Error trying to delete the trip.
     */
    .delete(trips.delete_a_trip);
  
  app.route('/v1/trips/keyword=word')
    /**
     * @swagger
     * /v1/trips/keyword=word:
     *    get:
     *      summary: Return a trip.
     *      tags: [Trip]
     *      parameters:
     *        - in: path
     *          name: word
     *          schema:
     *            type: string
     *          required: true
     *          description: key.
     *      responses:
     *        200:
     *          description: trips successfully retrieved.
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                $ref: '#/components/schemas/Trip'
     *        404:
     *          description: trip not found.
     *        500:
     *          description: Error trying to get the trip.
     */
     .get(trips.read_a_trip_by_keyword)

  app.route('/v1/trips/:tripId/cancel')

      /**
       * @swagger
       * /v1/trips/{tripId}/cancel:
       *    patch:
       *      summary: Cancel a trip.
       *      tags: [Trip]
       *      parameters:
       *        - in: path
       *          name: trip Id
       *          schema:
       *            type: string
       *          required: true
       *          description: key.
       *      responses:
       *        200:
       *          description: trips successfully calceled.
       *          content:
       *            application/json:
       *              schema:
       *                type: object
       *                $ref: '#/components/schemas/Trip'
       *        403:
       *          description: You don't have right role to carry out this operation.
       *        404:
       *          description: trip not found.
       *        500:
       *          description: Error trying to get the trip.
       */
    .patch(trips.cancel_a_trip)

    app.route('/v1/trips/:tripId/publish')

    /**
     * @swagger
     * /v1/trips/{tripId}/publish:
     *    patch:
     *      summary: Cancel a trip.
     *      tags: [Trip]
     *      parameters:
     *        - in: path
     *          name: trip Id
     *          schema:
     *            type: string
     *          required: true
     *          description: key.
     *      responses:
     *        200:
     *          description: trips successfully published.
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                $ref: '#/components/schemas/Trip'
     *        403:
     *          description: You don't have right role to carry out this operation.
     *        404:
     *          description: trip not found.
     *        500:
     *          description: Error trying to get the trip.
     */
    .patch(trips.publish_a_trip)

  app.route('/v1/trips/:tripId/stages')

    /**
     * @swagger
     * /v1/stages:
     *    get:
     *      summary: Returns all stages.
     *      tags: [Stage]
     *      responses:
     *        200:
     *          description: stages successfully retrieved.
     *          content:
     *            application/json:
     *              schema:
     *                type: array
     *                items:
     *                  $ref: '#/components/schemas/Stage'
     *        500:
     *          description: Error trying to get all stages.
     */
    .get(trips.list_all_stage)

    
    /**
     * @swagger
     * /v1/stages:
     *    post:
     *      summary: Create a new stage
     *      tags: [Stage]
     *      requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#/components/schemas/Stage'
     *      responses:
     *        201:
     *          description: Stage created.
     *        400:
     *          description: Error trying to create the Stage. Bad Request.
     *        403:
     *          description: You don't have right role to carry out this operation. Only managers can create stages.
     *        500:
     *          description: Error trying to create the Stage.
     */
    .post(trips.create_a_stage);

  app.route('/v1/stages/:stageId')

    /**
     * @swagger
     * /v1/stages/{stageId}:
     *    get:
     *      summary: Return a stage.
     *      tags: [Stage]
     *      parameters:
     *        - in: path
     *          name: stageId
     *          schema:
     *            type: string
     *          required: true
     *          description: stage id.
     *      responses:
     *        200:
     *          description: stage successfully retrieved.
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                $ref: '#/components/schemas/Stage'
     *        404:
     *          description: stage not found.
     *        500:
     *          description: Error trying to get the stage.
     */
    .get(trips.read_a_stage)

    /**
     * @swagger
     * /v1/stages/{stageId}:
     *    put:
     *      summary: Update a stage.
     *      tags: [Stage]
     *      parameters:
     *        - in: path
     *          name: stageId
     *          schema:
     *            type: string
     *          required: true
     *          description: Stage id.
     *      requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#/components/schemas/Stage'
     *      responses:
     *        200:
     *          description: Stage successfully updated.
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                $ref: '#/components/schemas/Stage'
     *        403:
     *          description: You don't have right role to carry out this operation. Only a manager can update it.
     *        404:
     *          description: Stage not found.
     *        500:
     *          description: Error trying to update the stage.
     */
    .put(trips.update_a_stage)

    /**
     * @swagger
     * /v1/stages/{stageId}:
     *    delete:
     *      summary: Delete a stage.
     *      tags: [Stage]
     *      parameters:
     *        - in: path
     *          name: stageId
     *          schema:
     *            type: string
     *          required: true
     *          description: Stage id.
     *      responses:
     *        200:
     *          description: Stage successfully deleted.
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                $ref: '#/components/schemas/Stage'
     *        403:
     *          description: You don't have right role to carry out this operation. Only a manager can delete it.
     *        404:
     *          description: Stage not found.
     *        500:
     *          description: Error trying to delete the stage.
     */
    .delete(trips.delete_a_stage);
};
