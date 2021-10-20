const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/UserController');
const {
    checkInfraAdmin,
} = require("../middlewares/keyClock") ;

/**
 * @swagger
 * /api/infraSetup:
 *   post:
 *     summary: Create admin user for infra.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description : The user's firstname
 *                 example: Hatim
 *               lastName:
 *                 type: string
 *                 description : The user's lastname
 *                 example: Daudi
 *               username:
 *                 type: string
 *                 description: The user's username.
 *                 example: hatim.daudi
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: life2work4SV!
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: hatim.daudi@gmail.com
 *               mobile:
 *                 type: string
 *                 description: The user's mobile.
 *                 example: 7869820020
 *               ccode:
 *                 type: string
 *                 description: The user's ccode.
 *                 example: +91
 *               country:
 *                 type: string
 *                 description: The user's country.
 *                 example: Indian
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
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
 */

router.post("/api/infraSetup", userCtrl.infraSetup);

/**
 * @swagger
 * /api/checkInfraIsConfigured:
 *   get:
 *     summary: Check if admin user is created.
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
 *                       example: user exists
 */

router.get("/api/checkInfraIsConfigured", userCtrl.checkInfraIsConfigured);



/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login API for infra users.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description : Username of the Infra users
 *                 example: hatim.daudi
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: life2work4SV!
 *     responses:
 *       201:
 *         description: Logged In
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
 *                       example: Logged In successfully
 *                     token:
 *                       type: string
 *                       description: token for the user authentication.
 *                       example: efwerfewwer
 */

router.post("/api/login", userCtrl.login);



/**
 * @swagger
 * /api/registerInfraUser:
 *   post:
 *     summary: Create user for infra.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description : Token of Infra
 *                 example: sdajfosiwefknoanfs
 *               firstName:
 *                 type: string
 *                 description : The user's firstname
 *                 example: Hatim
 *               lastName:
 *                 type: string
 *                 description : The user's lastname
 *                 example: Daudi
 *               username:
 *                 type: string
 *                 description: The user's username.
 *                 example: hatim.daudi
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: life2work4SV!
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: hatim.daudi@gmail.com
 *               mobile:
 *                 type: string
 *                 description: The user's mobile.
 *                 example: 7869820030
 *               ccode:
 *                 type: string
 *                 description: The user's ccode.
 *                 example: +91
 *               country:
 *                 type: string
 *                 description: The user's country.
 *                 example: Indian
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
 *                       example: User registed successfully
 */
router.post("/api/registerInfraUser", userCtrl.registerInfraUser);


/**
 * @swagger
 * /api/getInfraUsers:
 *   get:
 *     summary: Getting Infra users created By Infra Admin.
 *     security:
 *     - bearerAuth : ["iuhuyhuyhguy"]
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
router.get("/api/getInfraUsers", checkInfraAdmin , userCtrl.getInfraUsers);




/**
 * @swagger
 * /api/enableOrDisableUser:
 *   post:
 *     summary: Enable and disable user for infra.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description : Token of Infra
 *                 example: sdajfosiwefknoanfs
 *               userId:
 *                 type: string
 *                 description : The user's Id
 *                 example: asfsdim
 *               isEnabled:
 *                 type: boolean
 *                 description : true for enable and false for disable
 *                 example: true
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
 *                       example: User enabled successfully.
 */
router.post("/api/enableOrDisableUser", userCtrl.enableOrDisableUser);



/**
 * @swagger
 * /api/editUser:
 *   post:
 *     summary: edit user for infra.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description : Token of Infra
 *                 example: sdajfosiwefknoanfs
 *               userId:
 *                 type: string
 *                 description : The user's Id
 *                 example: asfsdim
 *               editParams:
 *                 type: string
 *                 description : true for enable and false for disable
 *                 example: true
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
 *                       example: User edited successfully.
 */
router.post("/api/editUser", userCtrl.editUser);






module.exports = router;
