'use strict'
module.exports = function (app) {

  const actors = require('../controllers/actorController')

  app.route('/v1/actors')

  /**
   * @swagger
   * /v1/actors:
   *    get:
   *      summary: Returns all actors.
   *      tags: [Actor]
   *      responses:
   *        200: 
   *          description: Actors successfully retrieved.
   *          content: 
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Actor'
   *        500: 
   *          description: Error trying to get all actors.
   */
  .get(actors.list_all_actors)

  /**
   * @swagger
   * /v1/actors:
   *    post:
   *      summary: Create a new actor
   *      tags: [Actor]
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              $ref: '#/components/schemas/Actor'
   *      responses:
   *        201: 
   *          description: Actor created.
   *        400: 
   *          description: Error trying to create the actor. Bad Request.
   *        403: 
   *          description: You don't have right role to carry out this operation.
   *        409: 
   *          description: Email is already registered.
   *        422: 
   *          description: Validation error.
   *        500: 
   *          description: Error trying to create the actor.
   */
  .post(actors.create_an_actor)

  app.route('/v1/actors/:actorId')

  /**
   * @swagger
   * /v1/actors/{actorId}:
   *    get:
   *      summary: Returns an actor.
   *      tags: [Actor]
   *      parameters:
   *        - in: path
   *          name: actorId
   *          schema:
   *            type: string
   *          required: true
   *          description: Actor id.
   *      responses:
   *        200: 
   *          description: Actor successfully retrieved.
   *          content: 
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/components/schemas/Actor'
   *        404: 
   *          description: Actor not found.
   *        500: 
   *          description: Error trying to get the actor.
   */
  .get(actors.read_an_actor)

   /**
   * @swagger
   * /v1/actors/{actorId}:
   *    put:
   *      summary: Updates an actor.
   *      tags: [Actor]
   *      parameters:
   *        - in: path
   *          name: actorId
   *          schema:
   *            type: string
   *          required: true
   *          description: Actor id.
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              $ref: '#/components/schemas/Actor'
   *      responses:
   *        200: 
   *          description: Actor successfully updated.
   *          content: 
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/components/schemas/Actor'
   *        403: 
   *          description: You don't have right role to carry out this operation.
   *        404: 
   *          description: Actor not found.
   *        409: 
   *          description: Email already registered.
   *        422: 
   *          description: Validation error.
   *        500: 
   *          description: Error trying to update the actor.
   */
  .put(actors.update_an_actor)

  /**
   * @swagger
   * /v1/actors/{actorId}:
   *    delete:
   *      summary: Deletes an actor.
   *      tags: [Actor]
   *      parameters:
   *        - in: path
   *          name: actorId
   *          schema:
   *            type: string
   *          required: true
   *          description: Actor id.
   *      responses:
   *        200: 
   *          description: Actor successfully deleted.
   *          content: 
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/components/schemas/Actor'
   *        403: 
   *          description: You don't have right role to carry out this operation.
   *        404: 
   *          description: Actor not found.
   *        500: 
   *          description: Error trying to delete the actor.
   */
  .delete(actors.delete_an_actor)

  /**
   * @swagger
   * /v1/actors/{actorId}/ban:
   *    patch:
   *      summary: Ban an actor.
   *      tags: [Actor]
   *      parameters:
   *        - in: path
   *          name: actorId
   *          schema:
   *            type: string
   *          required: true
   *          description: Actor id.
   *      responses:
   *        200: 
   *          description: Actor successfully banned.
   *          content: 
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/components/schemas/Actor'
   *        403: 
   *          description: You don't have right role to carry out this operation.
   *        404: 
   *          description: Actor not found.
   *        500: 
   *          description: Error trying to ban the actor.
   */
  app.route('/v1/actors/:actorId/ban')
  .patch(actors.ban_an_actor)

  /**
   * @swagger
   * /v1/actors/{actorId}/unban:
   *    patch:
   *      summary: Unban an actor.
   *      tags: [Actor]
   *      parameters:
   *        - in: path
   *          name: actorId
   *          schema:
   *            type: string
   *          required: true
   *          description: Actor id.
   *      responses:
   *        200: 
   *          description: Actor successfully unbanned.
   *          content: 
   *            application/json:
   *              schema:
   *                type: object
   *                $ref: '#/components/schemas/Actor'
   *        403: 
   *          description: You don't have right role to carry out this operation.
   *        404: 
   *          description: Actor not found.
   *        500: 
   *          description: Error trying to unban the actor.
   */
  app.route('/v1/actors/:actorId/unban')
  .patch(actors.unban_an_actor)

}