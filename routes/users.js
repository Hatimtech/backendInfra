const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/UserController');
const bankCtrl = require('../controllers/BankController');
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
 */

router.post("/api/login", userCtrl.login);



/**
 * @swagger
 * /api/registerInfraUser:
 *   post:
 *     summary: Create user for infra.
 *     Authorization: Bearer
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
 *                 example: Adarsh
 *               lastName:
 *                 type: string
 *                 description : The user's lastname
 *                 example: Sharma
 *               username:
 *                 type: string
 *                 description: The user's username.
 *                 example: adarsh.sharma
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: Hello@1234
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: s.adarsh@gmail.com
 *               mobile:
 *                 type: string
 *                 description: The user's mobile.
 *                 example: 9955347812
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
router.post("/api/registerInfraUser", checkInfraAdmin , userCtrl.registerInfraUser);


/**
 * @swagger
 * /api/getInfraUsers:
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
router.get("/api/getInfraUsers", checkInfraAdmin , userCtrl.getInfraUsers);




/**
 * @swagger
 * /api/enableOrDisableUser:
 *   post:
 *     summary: Enable and disable user for infra.
 *     Authorization: Bearer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description : The user's Id
 *                 example: a244bdab-a2b9-47c4-8cec-af95dd8d63f5
 *               isEnabled:
 *                 type: boolean
 *                 description : true for enable and false for disable
 *                 example: false
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
router.post("/api/enableOrDisableUser", checkInfraAdmin , userCtrl.enableOrDisableUser);



/**
 * @swagger
 * /api/editUser:
 *   post:
 *     summary: edit user for infra.
 *     Authorization: Bearer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userKeyclockId:
 *                 type: string
 *                 description : The user's Id
 *                 example: a244bdab-a2b9-47c4-8cec-af95dd8d63f5
 *               userMongoId:
 *                 type: string
 *                 description : The user's Id
 *                 example: 617188e56ed2151bc61ff1af
 *               firstName:
 *                 type: string
 *                 description : The user's firstname
 *                 example: Kartik
 *               lastName:
 *                 type: string
 *                 description : The user's lastname
 *                 example: Kashyap
 *               username:
 *                 type: string
 *                 description: The user's username.
 *                 example: kartik.kashyap
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: Hello@1234
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: k.kartik@gmail.com
 *               mobile:
 *                 type: string
 *                 description: The user's mobile.
 *                 example: 9955347811
 *               ccode:
 *                 type: string
 *                 description: The user's ccode.
 *                 example: +91
 *               country:
 *                 type: string
 *                 description: The user's country.
 *                 example: Indian
 *               logo:
 *                 type: string
 *                 description: The user's logo.
 *                 example: fwfdiawfawfn
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
router.post("/api/editUser",  checkInfraAdmin ,userCtrl.editUser);


// router.post("/api/createRole",  checkInfraAdmin ,userCtrl.createRole);



module.exports = router;
