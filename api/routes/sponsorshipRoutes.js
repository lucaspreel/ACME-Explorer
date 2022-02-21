'use strict'
module.exports = function (app) {
  
  const sponsorships = require('../controllers/sponsorshipController')

  app.route('/v1/sponsorships')

  /**
   * @swagger
   * /v1/sponsorships:
   *    post:
   *      summary: Create a sponsorship
   *      tags: [Sponsorship]
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              $ref: '#/components/schemas/Sponsorship'
   *      responses:
   *        201: 
   *          description: Sponsorship created.
   *        400: 
   *          description: Error trying to create the sponsorship. Bad Request.
   *        403: 
   *          description: You don't have right role to carry out this operation.
   *        409:
   *          description: There is already a sponsorship between this sponsor and this trip.
   *        500: 
   *          description: Error trying to create the sponsorship.
   */
    .post(sponsorships.create_a_sponsorship)

  /**
   * @swagger
   * /v1/sponsorships:
   *    get:
   *      summary: Return all sponsorships.
   *      tags: [Sponsorship]
   *      responses:
   *        200: 
   *          description: Sponsorships successfully retrieved.
   *          content: 
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Sponsorship'
   *        500: 
   *          description: Error trying to get all sponsorships.
   */
    .get(sponsorships.list_all_sponsorships)
  
  app.route('/v1/sponsorships/:sponsorshipId')
  
  /**
   * @swagger
   * /v1/sponsorships/{sponsorshipId}:
   *    get:
   *      summary: Return a sponsorship.
   *      tags: [Sponsorship]
   *      parameters:
   *        - in: path
   *          name: sponsorshipId
   *          schema:
   *            type: string
   *          required: true
   *          description: Sponsorship id.
   *      responses:
   *        200: 
   *          description: Sponsorship successfully retrieved.
   *          content: 
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/components/schemas/Sponsorship'
   *        404: 
   *          description: Sponsorship not found.
   *        500: 
   *          description: Error trying to get the sponsorship.
   */
    .get(sponsorships.read_a_sponsorship)

   /**
   * @swagger
   * /v1/sponsorships/{sponsorshipId}:
   *    put:
   *      summary: Update a sponsorship.
   *      tags: [Sponsorship]
   *      parameters:
   *        - in: path
   *          name: sponsorshipId
   *          schema:
   *            type: string
   *          required: true
   *          description: Sponsorship id.
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              $ref: '#/components/schemas/Sponsorship'
   *      responses:
   *        200: 
   *          description: Sponsorship successfully updated.
   *          content: 
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/components/schemas/Sponsorship'
   *        403: 
   *          description: You don't have right role to carry out this operation.
   *        404: 
   *          description: Sponsorship not found.
   *        500: 
   *          description: Error trying to update the sponsorship.
   */
    .put(sponsorships.update_a_sponsorship)

  /**
   * @swagger
   * /v1/sponsorships/{sponsorshipId}:
   *    delete:
   *      summary: Delete a sponsorship.
   *      tags: [Sponsorship]
   *      parameters:
   *        - in: path
   *          name: sponsorshipId
   *          schema:
   *            type: string
   *          required: true
   *          description: Sponsorship id.
   *      responses:
   *        200: 
   *          description: Sponsorship successfully deleted.
   *          content: 
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/components/schemas/Sponsorship'
   *        403: 
   *          description: You don't have right role to carry out this operation.
   *        404: 
   *          description: Sponsorship not found.
   *        500: 
   *          description: Error trying to delete the sponsorship.
   */
    .delete(sponsorships.delete_a_sponsorship)

  app.route('/v1/sponsorships/:sponsorshipId/pay')

  /**
   * @swagger
   * /v1/sponsorship/{sponsorshipId}/pay:
   *    patch:
   *      summary: Pay a sponsorship.
   *      tags: [Sponsorship]
   *      parameters:
   *        - in: path
   *          name: sponsorshipId
   *          schema:
   *            type: string
   *          required: true
   *          description: Sponsorship id.
   *      responses:
   *        200: 
   *          description: Sponsorship successfully payed.
   *          content: 
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/components/schemas/Sponsorship'
   *        403: 
   *          description: You don't have right role to carry out this operation.
   *        404: 
   *          description: Sponsorship not found.
   *        409:
   *          description: Sponsorship already payed.
   *        500: 
   *          description: Error trying to pay the sponsorship.
   */
    .patch(sponsorships.pay_a_sponsorship)
}
