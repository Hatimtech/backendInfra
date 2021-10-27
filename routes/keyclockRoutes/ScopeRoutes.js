const express = require('express');
const router = express.Router();

const scopeCtrl = require('../../controllers/KeyclockController/ScopeController');
const {
    checkInfraAdmin,
} = require("../../middlewares/keyClock");

/**
 * @swagger
 * /api/createScope:
 *   post:
 *     summary: create a new client.
 *     tags: ['Keyclock operations']
 *     Authorization: Bearer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description : The user's Id
 *                 example: create
 *               displayName:
 *                 type: string
 *                 description : The user's firstname
 *                 example: create
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       description: Status of the request.
 *                       example: 1
 *                     message:
 *                       type: string
 *                       description: Message for the logged in user.
 *                       example: Client created successfully.
 */
 router.post("/api/createScope",  checkInfraAdmin , scopeCtrl.createScope);

 module.exports = router;
