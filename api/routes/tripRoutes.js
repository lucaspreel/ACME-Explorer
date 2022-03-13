'use strict';
module.exports = function (app) {
  const trips = require('../controllers/tripController');
  const authController = require('../controllers/authController');

  /**
   * @swagger
   * components:
   *  schemas:
   *    Trip:
   *      type: object
   *      properties:
   *        managerId:
   *          type: string
   *          description: The manager of the trip.
   *        ticker:
   *          type: string
   *          description: The ticker of the trip. Autogenerated.
   *        title:
   *          type: string
   *          description: The title of the trip.
   *        description:
   *          type: string
   *          description: The description of the trip.
   *        price:
   *          type: number
   *          description: The price of the trip. Autogenerated based in stages prices.
   *        requirements:
   *          type: array
   *          items:
   *            type: string
   *          description: The requirements of the trip.
   *        stages:
   *          type: array
   *          items:
   *            type: string
   *          description: The stages of the trip.
   *        startDate:
   *          type: date
   *          description: The start date of the trip.
   *        endDate:
   *          type: date
   *          description: The end date of the trip.
   *        files:
   *          type: array
   *          items:
   *            type: string
   *            format: binary
   *          description: Pictures of the trip.
   *        publication_date:
   *          type: date
   *          description: The publication date of the trip.
   *        canceled:
   *          type: boolean
   *          description: if the trip has been canceled.
   *        cancelReason:
   *          type: String
   *          description: if the trip has been canceled, it must have a reason.
   *
   *      required:
   *        - managerId
   *        - title
   *        - description
   *        - requirements
   *        - stages
   *        - startDate
   *        - endDate
   *
   *      example:
   *        managerId: 6218eca775428925392c633f
   *        title: Pirineo Aragones.
   *        description: Discover this beautiful place.
   *        requirements: ['Legal age.', 'Sun glases.']
   *        stages: [{'title': 'Zone 1 of Pirineo.', 'description': 'a description', 'price': 10}, {'title': 'Zone 2 of Pirineo.', 'description': 'a description', 'price': 10}]
   *        startDate: "2023-02-20T19:45:02.792Z"
   *        endDate: "2024-01-30T12:24:49.594Z"
   *
   *    Stage:
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
   *        - description
   *        - price
   *
   *      example:
   *        title: Zone 1 of Pirineo
   *        description: More things about zone 1 of Pirineo
   *        price: 10
   *
   *    TripCancelReason:
   *      type: object
   *      properties:
   *        cancelReason:
   *          type: string
   *          description: The reason why the trip is cancelled.
   *
   *      required:
   *        - cancelReason
   *
   *      example:
   *        cancelReason: The weather conditions are not favourable.
   */

  // ------------------------------------------------------------------------------
  // TRIP'S SECTION
  // ------------------------------------------------------------------------------

  app.route('/v1/trips')

  /**
  * @swagger
  * /v1/trips:
  *    get:
  *      summary: Returns all trips.
  *      tags: [Trip]
  *      parameters:
  *        - in: header
  *          $ref: '#/components/parameters/PreferredLanguage'
  *        - in: query
  *          name: keyword
  *          schema:
  *            type: string
  *          required: false
  *          description: Single key word to filter trips by ticker, title, or description.
  *        - in: query
  *          name: managerId
  *          schema:
  *            type: string
  *          required: false
  *          description: Manager id to filter trips by manager actor.
  *        - in: query
  *          name: published
  *          schema:
  *            type: boolean
  *          required: false
  *          description: Boolean parameter to filter or not published trips.
  *      responses:
  *        200:
  *          description: trips successfully retrieved.
  *          content:
  *            application/json:
  *              schema:
  *                type: array
  *                items:
  *                  $ref: '#/components/schemas/Trip'
  *        422:
  *          description: Invalid parameter.
  *        500:
  *          description: Error trying to get all trips.
  */
    .get(trips.list_all_trips)

  /**
   * @swagger
   * /v1/trips:
   *    post:
   *      summary: Create a new trip
   *      tags: [Trip]
   *      parameters:
   *        - in: header
   *          $ref: '#/components/parameters/PreferredLanguage'
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
   *          description: Error trying to create the trip. Bad Request.
   *        401:
   *          description: Unauthorized.
   *        403:
   *          description: You don't have right role to carry out this operation. Only managers can create trips.
   *        500:
   *          description: Error trying to create the trip.
   *      security:
   *        - ApiKeyAuth: []
   */
    .post(
      authController.verifyAuthenticadedActor(['MANAGER']),
      trips.create_a_trip
    );

  app.route('/v1/trips/:tripId')

  /**
   * @swagger
   * /v1/trips/{tripId}:
   *    get:
   *      summary: Return a trip.
   *      tags: [Trip]
   *      parameters:
   *        - in: header
   *          $ref: '#/components/parameters/PreferredLanguage'
   *        - in: path
   *          name: tripId
   *          schema:
   *            type: string
   *          required: true
   *          description: trip id.
   *      responses:
   *        200:
   *          description: Trip successfully retrieved.
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
   *        - in: header
   *          $ref: '#/components/parameters/PreferredLanguage'
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
   *        401:
   *          description: Unauthorized.
   *        403:
   *          description: You don't have right role to carry out this operation. Only a manager can update it.
   *        404:
   *          description: Trip not found.
   *        500:
   *          description: Error trying to update the trip.
   *      security:
   *        - ApiKeyAuth: []
   */
    .put(
      authController.verifyAuthenticadedActor(['MANAGER']),
      authController.verifyAuthenticatedActorCanAccessParameterTrip(),
      authController.verifyTripIsNotPublished(),
      trips.update_a_trip
    )

  /**
   * @swagger
   * /v1/trips/{tripId}:
   *    delete:
   *      summary: Delete a trip.
   *      tags: [Trip]
   *      parameters:
   *        - in: header
   *          $ref: '#/components/parameters/PreferredLanguage'
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
   *        401:
   *          description: Unauthorized.
   *        403:
   *          description: You don't have right role to carry out this operation. Only a manager can delete it.
   *        404:
   *          description: Trip not found.
   *        500:
   *          description: Error trying to delete the trip.
   *      security:
   *        - ApiKeyAuth: []
   */
    .delete(
      authController.verifyAuthenticadedActor(['MANAGER']),
      authController.verifyAuthenticatedActorCanAccessParameterTrip(),
      authController.verifyTripIsNotPublished(),
      trips.delete_a_trip
    );

  app.route('/v1/trips/:tripId/cancel')

  /**
   * @swagger
   * /v1/trips/{tripId}/cancel:
   *    patch:
   *      summary: Cancel a trip.
   *      tags: [Trip]
   *      parameters:
   *        - in: header
   *          $ref: '#/components/parameters/PreferredLanguage'
   *        - in: path
   *          name: tripId
   *          schema:
   *            type: string
   *          required: true
   *          description: key.
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              $ref: '#/components/schemas/TripCancelReason'
   *      responses:
   *        200:
   *          description: Trip successfully canceled.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/components/schemas/Trip'
   *        401:
   *          description: Unauthorized.
   *        403:
   *          description: You don't have right role to carry out this operation.
   *        404:
   *          description: trip not found.
   *        422:
   *          description: Validation error.
   *        500:
   *          description: Error trying to get the trip.
   *      security:
   *        - ApiKeyAuth: []
   */
    .patch(
      authController.verifyAuthenticadedActor(['MANAGER']),
      authController.verifyAuthenticatedActorCanAccessParameterTrip(),
      authController.verifyTripCanBeCancelled(),
      trips.cancel_a_trip
    );

  app.route('/v1/trips/:tripId/publish')

  /**
   * @swagger
   * /v1/trips/{tripId}/publish:
   *    patch:
   *      summary: Publish a trip.
   *      tags: [Trip]
   *      parameters:
   *        - in: header
   *          $ref: '#/components/parameters/PreferredLanguage'
   *        - in: path
   *          name: trip Id
   *          schema:
   *            type: string
   *          required: true
   *          description: key.
   *      responses:
   *        200:
   *          description: Trip successfully published.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/components/schemas/Trip'
   *        401:
   *          description: Unauthorized.
   *        403:
   *          description: You don't have right role to carry out this operation.
   *        404:
   *          description: trip not found.
   *        500:
   *          description: Error trying to get the trip.
   *      security:
   *        - ApiKeyAuth: []
   */
    .patch(
      authController.verifyAuthenticadedActor(['MANAGER']),
      authController.verifyTripIsNotPublished(),
      trips.publish_a_trip
    );
};
