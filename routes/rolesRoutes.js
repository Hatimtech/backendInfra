const express = require('express');
const router = express.Router();

const roleCtrl = require('../controllers/RoleController');
const {
    checkInfraAdmin,
} = require("../middlewares/keyClock") ;

/**
 * @swagger
 * /api/createRole:
 *   post:
 *     summary: Create Role.
 *     tags: ['Role operations']
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
 *                 description: The user's first name.
 *                 example: Mohan
 *               attributes:
 *                 type: object
 *                 properties:
 *                   permission1:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: 000
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
 *                       example: Role created successfully
 */
 router.post("/api/createRole", checkInfraAdmin , roleCtrl.createUserRoles);


 /**
 * @swagger
 * /api/getAllRoles:
 *   get:
 *     summary: Getting Infra users created By Infra Admin.
 *     tags: ['Role operations']
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
router.get("/api/getAllRoles", checkInfraAdmin , roleCtrl.getAllRoles);

/**
 * @swagger
 * /api/deleteRole:
 *   post:
 *     summary: Create Role.
 *     tags: ['Role operations']
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
 *                 description: The user's first name.
 *                 example: Mohan
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
 router.post("/api/deleteRole", checkInfraAdmin , roleCtrl.deleteRole);

 /**
 * @swagger
 * /api/editRole:
 *   post:
 *     summary: Edit Role.
 *     tags: ['Role operations']
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
 *                 description: The user's first name.
 *                 example: Mohan
 *               attributes:
 *                 type: object
 *                 properties:
 *                   permission2:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: 100
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
 *                       example: Role edited successfully
 */
  router.post("/api/editRole", checkInfraAdmin , roleCtrl.editeRoles);

  /**
 * @swagger
 * /api/assignRole:
 *   post:
 *     summary: Create Role.
 *     tags: ['Role operations']
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
 *                 description: The user's first name.
 *                 example: Mohan
 *               userKeyclockId:
 *                 type: string
 *                 description : The user's Id
 *                 example: a244bdab-a2b9-47c4-8cec-af95dd8d63f5
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
 router.post("/api/assignRole", checkInfraAdmin , roleCtrl.assignRole);



 module.exports = router;
