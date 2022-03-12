'use strict';
module.exports = function (app) {
/**
 * @swagger
 * components:
 *  schemas:
 *    Application:
 *      type: object
 *      properties:
*         applicationMoment:
*           type: string
*           description: .
*         comments:
*           type: string
*           description: .
*         status:
*           type: string
*           description: .
*         explorer_Id:
*           type: string
*           description: .
*         trip_Id:
*           type: string
*           description: .
*         rejected_reason:
*           type: string
*           description: .
*         tripPrice:
*           type: number
*           description:.
*         manager_Id:
*           type: string
*            description: .
*         deleted:
*           type: boolean
*           description:
  *     required:
  *       - comments
  *       - explorer_Id
  *       - trip_Id
  *     example:
  *      applicationMoment: 2022-04-09T04:22:38.500Z
  *      comments: Quam eius voluptas
  *      status: PENDING
  *      explorer_Id: 621a7673d84d61951111e55d
  *      trip_Id: 621a7673b71cac0f344720d5
  *      rejected_reason:
  *      tripPrice: 84
  *      manager_Id: 961a7673b71fas0f344720d3
  *      deleted:false
  *
  *
  */
  const application = require('../controllers/applicationController');

  app.route('/v1/applications')
  /**
   * @swagger
   * /v1/applications:
   *    get:
   *      summary: Returns all application.
   *      tags: [Application]
   *      responses:
   *        200:
   *          description: Applications successfully retrieved.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Application'
   *        500:
   *          description: Error trying to get all applications.
   */
    .get(application.list_all_application)
  /**
   * @swagger
   * /v1/applications:
   *    post:
   *      summary: Create a new application
   *      tags: [Application]
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              $ref: '#/components/schemas/Application'
   *      responses:
   *        201:
   *          description: Application  created.
   *        400:
   *          description: Error trying to create the application . Bad Request.   *
   *        422:
   *          description: Validation error.
   *        500:
   *          description: Error trying to create the application .
   */
    .post(application.create_an_application);

  app.route('/v1/applications/:applicationId')
    /**
   * @swagger
   * /v1/applications/{applicationId}:
   *    delete:
   *      summary: Deletes an application.
   *      tags: [Application]
   *      parameters:
   *        - in: path
   *          name: applicationId
   *          schema:
   *            type: string
   *          required: true
   *          description: applicationId.
   *      responses:
   *        200:
   *          description: Application  successfully deleted.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/components/schemas/Application '
   *        403:
   *          description: You don't have right role to carry out this operation.
   *        404:
   *          description: Application  not found.
   *        500:
   *          description: Error trying to delete the application .
   */
    .delete(application.delete_an_application);

  app.route('/v1/applications/manager/:managerId')
  /**
   * @swagger
   * /v1/applications/manager/{managerId}:
   *    get:
   *      summary: Returns an application .
   *      tags: [Application]
   *      parameters:
   *        - in: path
   *          name: managerId
   *          schema:
   *            type: string
   *          required: true
   *          description: manager  id.
   *      responses:
   *        200:
   *          description: Application successfully retrieved.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/components/schemas/Application '
   *        404:
   *          description: Actor not found.
   *        500:
   *          description: Error trying to get the application .
   */
    .get(application.find_by_manager_id);

  app.route('/v1/applications/explorer/:explorerId')
    /**
   * @swagger
   * /v1/applications/explorer/{explorerId}
   *    get:
   *      summary: Returns an application .
   *      tags: [Application]
   *      parameters:
   *        - in: path
   *          name: explorerId
   *          schema:
   *            type: string
   *          required: true
   *          description: Application  id.
   *      responses:
   *        200:
   *          description: Application  successfully retrieved.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/components/schemas/Application '
   *        404:
   *          description: Actor not found.
   *        500:
   *          description: Error trying to get the application .
   */
    .get(application.find_by_explorer_id);

  app.route('/v1/applications/:applicationId/reject')
    /**
   * @swagger
   * /v1/applications/{applicationId}/reject:
   *    patch:
   *      summary: Ban an application.
   *      tags: [Application ]
   *      parameters:
   *        - in: path
   *          name: applicationId
   *          schema:
   *            type: string
   *          required: true
   *          description: Application  id.
   *      responses:
   *        200:
   *          description: Application  successfully reject.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/components/schemas/Application '
   *        403:
   *          description: You don't have right role to carry out this operation.
   *        404:
   *          description: Actor not found.
   *        500:
   *          description: Error trying to ban the application .
   */
    .patch(application.reject_application);

  app.route('/v1/applications/:applicationId/due')
  /**
   * @swagger
   * /v1/applications/{applicationId}/due:
   *    patch:
   *      summary: Ban an application.
   *      tags: [Application ]
   *      parameters:
   *        - in: path
   *          name: applicationId
   *          schema:
   *            type: string
   *          required: true
   *          description: Application  id.
   *      responses:
   *        200:
   *          description: Application  successfully due.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/components/schemas/Application '
   *        403:
   *          description: You don't have right role to carry out this operation.
   *        404:
   *          description: Actor not found.
   *        500:
   *          description: Error trying to ban the application .
   */
    .patch(application.due_application);

  app.route('/v1/applications/:applicationId/pay')
  /**
   * @swagger
   * /v1/applications/{applicationId}/pay:
   *    patch:
   *      summary: Ban an application.
   *      tags: [Application ]
   *      parameters:
   *        - in: path
   *          name: applicationId
   *          schema:
   *            type: string
   *          required: true
   *          description: Application  id.
   *      responses:
   *        200:
   *          description: Application  successfully pay.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/components/schemas/Application '
   *        403:
   *          description: You don't have right role to carry out this operation.
   *        404:
   *          description: Actor not found.
   *        500:
   *          description: Error trying to ban the application .
   */
    .patch(application.pay_application);

  app.route('/v1/applications/:applicationId/cancel')
  /**
   * @swagger
   * /v1/applications/{applicationId}/cancel:
   *    patch:
   *      summary: Ban an application.
   *      tags: [Application ]
   *      parameters:
   *        - in: path
   *          name: applicationId
   *          schema:
   *            type: string
   *          required: true
   *          description: Application  id.
   *      responses:
   *        200:
   *          description: Application  successfully cancel.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/components/schemas/Application '
   *        403:
   *          description: You don't have right role to carry out this operation.
   *        404:
   *          description: Actor not found.
   *        500:
   *          description: Error trying to ban the application .
   */
    .patch(application.cancelled_application);
};
