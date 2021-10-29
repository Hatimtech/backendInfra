const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/UserController');
const bankCtrl = require('../controllers/BankController');
const {
    checkInfraAdmin,
} = require("../middlewares/keyClock") ;

/**
 * @swagger
 * /api/registerInfraAdmin:
 *   post:
 *     summary: Create admin user for infra.
 *     tags: ['User operations']
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

router.post("/api/registerInfraAdmin", userCtrl.infraSetup);

/**
 * @swagger
 * /api/checkInfraIsConfigured:
 *   get:
 *     summary: Check if admin user is created.
 *     tags: ['User operations']
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
 *     tags: ['User operations']
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
 *     tags: ['User operations']
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
 * /api/getUserRole:
 *   get:
 *     summary: Getting Infra Client roles for user .
 *     tags: ['User operations']
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
 *                     role:
 *                       type: array
 *                       items:
 *                          type: object
 *                          properties:
 *                               role1:
 *                                  type: string
 *                                  description: first name of User.
 *                                  example: admin. 
 */
 router.get("/api/getUserRole" , userCtrl.getRoleFromToken);



/**
 * @swagger
 * /api/evaluteUser:
 *   post:
 *     summary: create a new Scope.
 *     tags: ['User operations']
 *     Authorization: Bearer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 description : The clien's Id
 *                 example: 9cb3cd66-4537-4539-ada5-026e10ea152f
 *               userId:
 *                 type: string
 *                 description : The user's Id
 *                 example: c72de78c-ae33-4c39-b241-171b5997f26a
 *               roleIds:
 *                 type: array
 *                 items:
 *                    type: string
 *                    example: infra-admin
 *               resources:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: resource id.
 *                       example: 1e30c56c-e5de-497c-a1dd-1c94c25868c7
 *                     name:
 *                       type: string
 *                       description: Scope name.
 *                       example: bankDashboard
 *                     displayName:
 *                       type: string
 *                       description: Scope display name.
 *                       example: bankDashboard 
 *                     ownerManagedAccess:
 *                       type: boolean
 *                       description: Scope display name.
 *                       example: false 
 *                     uris:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: www.google.com
 *                     scopes:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: Delete
 *                     owner:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               description: Owner id.
 *                               example: 9cb3cd66-4537-4539-ada5-026e10ea152f
 *                             name:
 *                               type: string
 *                               description: Owner name.
 *                               example: infra-client
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
 router.post("/api/evaluteUser" , userCtrl.evaluate);



/**
 * @swagger
 * /api/getInfraUsers:
 *   get:
 *     summary: Getting Infra users created By Infra Admin.
 *     tags: ['User operations']
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
 * /api/getAllUsers:
 *   get:
 *     summary: Getting Infra users created By Infra Admin.
 *     tags: ['User operations']
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
 router.get("/api/getAllUsers", checkInfraAdmin , userCtrl.getAllUsers);




/**
 * @swagger
 * /api/enableOrDisableUser:
 *   post:
 *     summary: Enable and disable user for infra.
 *     tags: ['User operations']
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
 *     tags: ['User operations']
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




module.exports = router;
