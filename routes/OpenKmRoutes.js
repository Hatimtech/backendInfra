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
router.post("/api/createFolder", openKmController.createFolder);

/**
 * @swagger
 * /api/uploadFile:
 *   post:
 *     summary: Upload file on OPEN_KM.
 *     tags:
 *       - OpenKm Api
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               docPath:
 *                 type: string
 *                 description : the name of the folder
 *                 example: folder/image.png
 *               content:
 *                 type: string
 *                 format: binary
 *           encoding:
 *             content:
 *              contentType: image/png, image/jpeg
 *             docPath:
 *              contentType: text/plain
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
router.post("/api/uploadFile",openKmController.uploadFile);

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
 *         example: 0870d8a3-9483-42cc-8381-af0dd94b8cbd
 *     responses:
 *       200:
 *         description: A file
 *         content:
 *           application/json:
 *             schema:
 *               type: objet
 *               properties:
 *                 file:
 *                   type: string
 *                   format: byte
 */
router.get("/api/getFile", openKmController.getFile);


module.exports = router;
