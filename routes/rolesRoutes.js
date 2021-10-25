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
 *                       example: Bank created successfully
 */
 router.post("/api/createRole", checkInfraAdmin , roleCtrl.createUserRoles);


 /**
 * @swagger
 * /api/getAllRoles:
 *   get:
 *     summary: Getting Infra users created By Infra Admin.
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




 module.exports = router;
