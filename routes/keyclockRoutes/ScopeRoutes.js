const express = require('express');
const router = express.Router();

const scopeCtrl = require('../../controllers/KeyclockController/ScopeController');
const {
    checkInfraAdmin
} = require("../../middlewares/validators/AuthorizationValidator") ;

/**
 * @swagger
 * /api/createScope:
 *   post:
 *     summary: create a new Scope.
 *     tags: ['Scope operations']
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

 /**
 * @swagger
 * /api/getAllScopes:
 *   get:
 *     summary: Getting Scopes of a client.
 *     tags: ['Scope operations']
 *     Authorization: Bearer
 *     responses:
 *       200:
 *         description: get
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     status:
 *                       type: integer
 *                       description: The status code.
 *                       example: 1
 *                     message:
 *                       type: string
 *                       description: The status message.
 *                       example: users found.                       
 *                     users:
 *                       type: array
 *                       items:
 *                          type: object
 *                          properties:
 *                               firstName:
 *                                  type: string
 *                                  description: first name of User.
 *                                  example: Hatim. 
 */
router.get("/api/getAllScopes", checkInfraAdmin , scopeCtrl.getAllScopes);

/**
 * @swagger
 * /api/deleteScope:
 *   post:
 *     summary: Delete Scope.
 *     tags: ['Scope operations']
 *     Authorization: Bearer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scopeId:
 *                 type: string
 *                 description: Id of scope.
 *                 example: ad12b7bf-9996-479e-ab02-1ad1079d422c
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
 *                       example: Role deleted successfully
 */
 router.post("/api/deleteScope", checkInfraAdmin , scopeCtrl.deleteScopes);

 /**
 * @swagger
 * /api/updateScope:
 *   post:
 *     summary: Update Scope.
 *     tags: ['Scope operations']
 *     Authorization: Bearer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scopeId:
 *                 type: string
 *                 description: Id of scope.
 *                 example: ad12b7bf-9996-479e-ab02-1ad1079d422c
 *               name:
 *                 type: string
 *                 description: name of scope.
 *                 example: view
 *               displayName:
 *                 type: string
 *                 description: name of scope.
 *                 example: view
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
 *                       example: Role deleted successfully
 */
  router.post("/api/updateScope", checkInfraAdmin , scopeCtrl.updateScopes);

 module.exports = router;
