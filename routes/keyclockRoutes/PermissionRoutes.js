const express = require('express');
const router = express.Router();

const permissionCtrl = require('../../controllers/KeyclockController/PermissionController');
const {
    checkInfraAdmin
} = require("../../middlewares/validators/AuthorizationValidator") ;

/**
 * @swagger
 * /api/createPermission:
 *   post:
 *     summary: create a new Permission.
 *     tags: ['Permission operations']
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
 *                 example: permission1
 *               description:
 *                 type: string
 *                 description : policy description
 *                 example: permission1
 *               policies:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: policies id.
 *                   example: b0779375-f5fb-434d-b2a6-10ed59ae69fb 
 *               resources:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: resource id.
 *                   example: f66f3ef8-a2fc-4694-b841-03ce05b4c1cf
 *               scopes:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: scope id.
 *                   example: 231eb3c0-a194-440b-bc4b-422a58630325
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
 router.post("/api/createPermission",  checkInfraAdmin , permissionCtrl.createPermissions);

 /**
 * @swagger
 * /api/getAllPermissions:
 *   get:
 *     summary: Getting Permissions of a client.
 *     tags: ['Permission operations']
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
router.get("/api/getAllPermissions", checkInfraAdmin , permissionCtrl.getAllPermission);

/**
 * @swagger
 * /api/updatePermission:
 *   post:
 *     summary: update a  Permission.
 *     tags: ['Permission operations']
 *     Authorization: Bearer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permissionId:
 *                 type: string
 *                 description : Permission name
 *                 example: 60d57bdf-6c7e-4ef4-a2d3-ce504b15a429
 *               name:
 *                 type: string
 *                 description : Permission name
 *                 example: Permission3
 *               description:
 *                 type: string
 *                 description : Permission description
 *                 example: Permission3
 *               policies:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: policies id.
 *                   example: b0779375-f5fb-434d-b2a6-10ed59ae69fb  
 *               resources:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: policies id.
 *                   example: f66f3ef8-a2fc-4694-b841-03ce05b4c1cf
 *               scopes:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: scope id.
 *                   example: 231eb3c0-a194-440b-bc4b-422a58630325
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
 router.post("/api/updatePermission",  checkInfraAdmin , permissionCtrl.updatePermissions);

 /**
 * @swagger
 * /api/deletePermission:
 *   post:
 *     summary: Delete Policy.
 *     tags: ['Permission operations']
 *     Authorization: Bearer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permissionId:
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
  router.post("/api/deletePermission", checkInfraAdmin , permissionCtrl.deletePermissions);


 module.exports = router;