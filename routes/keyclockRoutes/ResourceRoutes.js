const express = require('express');
const router = express.Router();

const resourceCtrl = require('../../controllers/KeyclockController/ResourseController');
const {
    checkInfraAdmin
} = require("../../middlewares/validators/AuthorizationValidator") ;

/**
 * @swagger
 * /api/createResource:
 *   post:
 *     summary: create a new Scope.
 *     tags: ['Resourse operations']
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
 *                 example: bank
 *               displayName:
 *                 type: string
 *                 description : The user's firstname
 *                 example: bank
 *               scopes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Scope id.
 *                       example: 97c7b603-c5b0-4525-95f5-9b945570d60d
 *                     name:
 *                       type: string
 *                       description: Scope name.
 *                       example: vuiiew
 *                     displayName:
 *                       type: string
 *                       description: Scope display name.
 *                       example: vuiiew 
 *               uris:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: www.google.com
 *               
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
 router.post("/api/createResource",  checkInfraAdmin , resourceCtrl.createResources);

 /**
 * @swagger
 * /api/getAllResources:
 *   get:
 *     summary: Getting Resources of a client.
 *     tags: ['Resourse operations']
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
router.get("/api/getAllResources", checkInfraAdmin , resourceCtrl.getAllResources);

/**
 * @swagger
 * /api/deleteResourse:
 *   post:
 *     summary: Delete Resourse.
 *     tags: ['Resourse operations']
 *     Authorization: Bearer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resourceId:
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
 router.post("/api/deleteResourse", checkInfraAdmin , resourceCtrl.deleteResources);

 /**
 * @swagger
 * /api/updateResource:
 *   post:
 *     summary: create a new Scope.
 *     tags: ['Resourse operations']
 *     Authorization: Bearer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resourceId:
 *                 type: string
 *                 description : The user's Id
 *                 example: f66f3ef8-a2fc-4694-b841-03ce05b4c1cf
 *               name:
 *                 type: string
 *                 description : The user's Id
 *                 example: bank
 *               displayName:
 *                 type: string
 *                 description : The user's firstname
 *                 example: bank
 *               scopes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Scope id.
 *                       example: 97c7b603-c5b0-4525-95f5-9b945570d60d
 *                     name:
 *                       type: string
 *                       description: Scope name.
 *                       example: vuiiew
 *                     displayName:
 *                       type: string
 *                       description: Scope display name.
 *                       example: vuiiew 
 *               uris:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: www.google.com
 *               
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
  router.post("/api/updateResource",  checkInfraAdmin , resourceCtrl.updateResources);

 module.exports = router;