const express = require("express");
const router = express.Router();

const {
    retrieve,
    create,
    find,
    remove,
    update,
    transfer,
} = require("../controllers/envelopes");

/**
 * @swagger
 * /api/v1/envelopes:
 *    get:
 *      summary: Retrieves all the envelopes
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      responses:
 *        "200":
 *          description: Returns a list of all the envelopes
 *
 */
router.get("/", retrieve);

/**
 * @swagger
 * /api/v1/envelopes/{id}:
 *    get:
 *      summary: Finds an envelope by its identifier
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: identifier of the envelope
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "200":
 *          description: Returns an envelope along with its data
 *        "404":
 *          description: The envelope cannot be found
 *        "500":
 *          description: Internal server error
 */
router.get("/:id", find);

/**
 * @swagger
 * /api/v1/envelopes:
 *    post:
 *      summary: Creates a new envelope
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      requestBody:
 *        description: Data of the new envelope
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                budget:
 *                  type: integer
 *              example:
 *                title: Transportation
 *                budget: 50
 *      responses:
 *        "201":
 *          description: Returns the created envelope
 *        "500":
 *          description: Internal server error
 */
router.post("/", create);

/**
 * @swagger
 * /api/v1/envelopes/{id}:
 *    put:
 *      summary: Updates an existing envelope
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: envelope ID
 *          type: integer
 *          required: true
 *          example: 1
 *      requestBody:
 *        description: Data for new envelope
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                budget:
 *                  type: integer
 *              example:
 *                title: Transportation
 *                budget: 50
 *      responses:
 *        "201":
 *          description: Returns the updated envelope
 *        "404":
 *          description: The envelope cannot be found
 *        "500":
 *          description: Internal server error
 */
router.put("/:id", update);

/**
 * @swagger
 * /api/v1/envelopes/{id}:
 *    delete:
 *      summary: Deletes an individual envelope
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Envelope ID to delete
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "204":
 *          description: Deletes the envelope
 *        "404":
 *          description: The envelope cannot be found
 *        "500":
 *          description: Internal server error
 */
router.delete("/:id", remove);

/**
 * @swagger
 * /api/v1/envelopes/{fromId}/transfer/{toId}:
 *    post:
 *      summary: Transfers budget from one envelope to another
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: from
 *          description: Identifier of the envelope from which the budget is taken
 *          type: integer
 *          required: true
 *          example: 1
 *        - in: path
 *          name: to
 *          description: Identifier of the envelope to which the budget is given
 *          type: integer
 *          required: true
 *          example: 2
 *      requestBody:
 *        description: Amount of money to transfer
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                amount:
 *                  type: integer
 *              example:
 *                amount: 300
 *      responses:
 *        "201":
 *          description: Returns the origin and the destination envelopes
 *        "400":
 *          description: An error occurred while transferring the budget
 *        "500":
 *          description: Internal server error
 */
router.post('/:fromId/transfer/:toId', transfer);

module.exports = router;
