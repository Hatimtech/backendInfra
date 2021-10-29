const express = require('express');
const router = express.Router();

const policyCtrl = require('../../controllers/KeyclockController/PolicyController');
const {
    checkInfraAdmin
} = require("../../middlewares/validators/AuthorizationValidator") ;

/**
 * @swagger
 * /api/createPolicy:
 *   post:
 *     summary: create a new Policy.
 *     tags: ['Policy operations']
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
 *                 description : policy name
 *                 example: policy1
 *               description:
 *                 type: string
 *                 description : policy description
 *                 example: policy1
 *               roles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Scope id.
 *                       example: 08ac15bf-d7bf-40f9-a1a2-280e321f58f4
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
 router.post("/api/createPolicy",  checkInfraAdmin , policyCtrl.createPolicies);

 /**
 * @swagger
 * /api/getAllPolicies:
 *   get:
 *     summary: Getting Resources of a client.
 *     tags: ['Policy operations']
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
router.get("/api/getAllPolicies", checkInfraAdmin , policyCtrl.getAllPolicies);

/**
 * @swagger
 * /api/deletePolicy:
 *   post:
 *     summary: Delete Policy.
 *     tags: ['Policy operations']
 *     Authorization: Bearer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               policyId:
 *                 type: string
 *                 description: Id of scope.
 *                 example: b2b3c37d-c3db-4c60-9ed7-b5aae4c85a6e
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
 router.post("/api/deletePolicy", checkInfraAdmin , policyCtrl.deletePolicies);

 /**
 * @swagger
 * /api/updatePolicy:
 *   post:
 *     summary: update a policy.
 *     tags: ['Policy operations']
 *     Authorization: Bearer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               policyId:
 *                 type: string
 *                 description: Id of scope.
 *                 example: 1824d0bb-88ae-411a-90ff-7e65c75a3a7f
 *               name:
 *                 type: string
 *                 description : policy name
 *                 example: policy3
 *               description:
 *                 type: string
 *                 description : policy description
 *                 example: policy3
 *               roles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: role id.
 *                       example: 08ac15bf-d7bf-40f9-a1a2-280e321f58f4
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
  router.post("/api/updatePolicy",  checkInfraAdmin , policyCtrl.updatePolicies);

 module.exports = router;