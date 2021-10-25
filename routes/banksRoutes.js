const express = require('express');
const router = express.Router();

const bankCtrl = require('../controllers/BankController');
const {
    checkInfraAdmin,
} = require("../middlewares/keyClock") ;







/**
 * @swagger
 * /api/createBank:
 *   post:
 *     summary: Create Bank for infra.
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
 *                 description: The user's first name.
 *                 example: Mohan
 *               lastName:
 *                 type: string
 *                 description: The user's last name.
 *                 example: Deep
 *               username: 
 *                 type: string
 *                 description: The user's username.
 *                 example: mohan.deep
 *               name:
 *                 type: string
 *                 description: The bank's name.
 *                 example: sbibank
 *               bcode:
 *                 type: string
 *                 description: The user's code.
 *                 example: sbibank
 *               address:
 *                 type: string
 *                 description: The user's address.
 *                 example: mumbai
 *               state:
 *                 type: string
 *                 description: The user's state.
 *                 example: maharastra
 *               user_id:
 *                 type: string
 *                 description: The user's user id.
 *                 example: sbibank
 *               zip:
 *                 type: string
 *                 description: The user's zip.
 *                 example: 673452
 *               contract:
 *                 type: string
 *                 description: The user's username.
 *                 example: awfwfwfgwggwp
 *               logo:
 *                 type: string
 *                 description: The user's username.
 *                 example: egggwsgeggwp
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: Hello@1234
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: sbibank@gmail.com
 *               mobile:
 *                 type: string
 *                 description: The user's mobile.
 *                 example: 9345612344
 *               ccode:
 *                 type: string
 *                 description: The user's ccode.
 *                 example: +91
 *               country:
 *                 type: string
 *                 description: The user's country.
 *                 example: India
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
 router.post("/api/createBank", checkInfraAdmin , bankCtrl.createBank);


 /**
 * @swagger
 * /api/enableOrDisableBank:
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
router.post("/api/enableOrDisableBank", checkInfraAdmin , bankCtrl.enableOrDisableBank);

/**
 * @swagger
 * /api/editBank:
 *   post:
 *     summary: edit bank for infra.
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
 *               userMongoId:
 *                 type: string
 *                 description : The user's Id
 *                 example: 617188e56ed2151bc61ff1af
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: icicibank
 *               address:
 *                 type: string
 *                 description: The user's address.
 *                 example: bangalore
 *               state:
 *                 type: string
 *                 description: The user's state.
 *                 example: karnataka
 *               zip:
 *                 type: string
 *                 description: The user's zip.
 *                 example: 673456
 *               contract:
 *                 type: string
 *                 description: The user's username.
 *                 example: awfwfwfgwgg
 *               logo:
 *                 type: string
 *                 description: The user's username.
 *                 example: egggwsgeg
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: Hello@1234
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: icicibank@gmail.com
 *               mobile:
 *                 type: string
 *                 description: The user's mobile.
 *                 example: 9345612345
 *               ccode:
 *                 type: string
 *                 description: The user's ccode.
 *                 example: +91
 *               country:
 *                 type: string
 *                 description: The user's country.
 *                 example: India
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
 *                       example: Bank edited successfully.
 */
 router.post("/api/editBank",  checkInfraAdmin ,bankCtrl.editBank);







module.exports = router;
