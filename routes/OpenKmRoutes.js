const express = require('express');
const router = express.Router();

const openKmController = require('../controllers/OpenKmController');

/**
 * @swagger
 * /api/createFolder:
 *   post:
 *     summary: Create folder on OPEN_KM.
 *     tags:
 *       - OpenKm Api
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               path:
 *                 type: string
 *                 description : the name of the folder
 *                 example: folder
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     author:
 *                       type: string
 *                       description: The user creator.
 *                       example: okmAdmin
 *                     created:
 *                       type: string
 *                       description: The  date of creation.
 *                       example: 2021-10-26T18:04:22.342Z
 *                     path:
 *                       type: string
 *                       description: The path of folder.
 *                       example: /okm:root/folder
 *                     permissions:
 *                       type: int
 *                       description: the permission of folder.
 *                       example: 15
 *                     subscribed:
 *                       type: boolean
 *                       description: .
 *                       example: false
 *                     uuid:
 *                       type: string
 *                       description: .
 *                       example: ced7d94a-ddc5-4f73-b324-c2a18442578b
 *                     hasChildren:
 *                       type: string
 *                       description: if folder has children.
 *                       example: false
 */
router.post("/api/createFolder" , openKmController.createFolder);

/**
 * @swagger
 * /api/uploadFile:
 *   post:
 *     summary: Create folder on OPEN_KM.
 *     tags:
 *       - OpenKm Api
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description : the name of the file
 *                 example: folder
 *                 format: binary
 *               pathToStore:
 *                 type: object
 *                 properties:
 *                   docPath:
 *                    type : string
 *                    description : the path of the file
 *                    example: /okm:root/folder/image.png
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     author:
 *                       type: string
 *                       description: The user creator.
 *                       example: okmAdmin
 *                     created:
 *                       type: string
 *                       description: The  date of creation.
 *                       example: 2021-10-26T18:04:22.342Z
 *                     path:
 *                       type: string
 *                       description: The path of folder.
 *                       example: /okm:root/folder
 *                     permissions:
 *                       type: int
 *                       description: the permission of folder.
 *                       example: 15
 *                     subscribed:
 *                       type: boolean
 *                       description: .
 *                       example: false
 *                     uuid:
 *                       type: string
 *                       description: .
 *                       example: ced7d94a-ddc5-4f73-b324-c2a18442578b
 *                     hasChildren:
 *                       type: string
 *                       description: if folder has children.
 *                       example: false
 */
router.post("/api/uploadFile" , openKmController.uploadFile);

/**
 * @swagger
 * /api/getFile:
 *   get:
 *     summary: Gets a file from Open KM.
 *     tags:
 *       - OpenKm Api
 *     parameters:
 *       - in: query
 *         name: docId
 *         schema:
 *           type: string
 *         required: true
 *         description: Doc id of the file
 *         example: e62ec3be-d6fe-4d20-9564-2f92e58e2885
 *     responses:
 *       200:
 *         description: A file
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 */
 router.get("/api/getFile" , openKmController.getFile);


module.exports = router;
