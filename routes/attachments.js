const express = require("express");
const router = express.Router();
const { saveAttachment, previewAttachment, previewAttachmentInfo, previewAttachmentInfoList } = require("../controllers/attachmentController");
const { uploadMemoryStorage } = require("../config/attachment");

const firebaseStorage = require("../config/firebase");
const { ref, uploadBytesResumable } = require("firebase/storage");


/**
 * @swagger
 * /api/attachments/saveAttachment:
 *   post:
 *     tags: [Attachment]
 *     operatorId: saveAttachment
 *     description: Save attachment
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - Files[]
 *             properties:
 *               Files[]:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *
 *     responses:
 *       201:
 *         description: Upload Successful
 *       400:
 *         description: Bad Request
 *
 */
router.route("/saveAttachment").post(uploadMemoryStorage.array("Files[]"), async (req, res, next) => {
    try {
        if (req.files) {
            req.files.forEach((file) => {
                file.originalname = file.originalname + "_" + Date.now();
                uploadBytesResumable(ref(firebaseStorage, `attachments/${file.originalname}`), file.buffer, { contentType: file.mimetype});
            });
        }
        next();
    } catch (error) {
        next(error);
    }
}, saveAttachment);

/**
 * @swagger
 * /api/attachments/previewAttachment/{id}:
 *   get:
 *     tags: [Attachment]
 *     operatorId: previewAttachment
 *     description: Preview attachment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Attachment ID
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *
 */
router.route("/previewAttachment/:attachmentId").get(previewAttachment);

/**
 * @swagger
 * /api/attachments/previewAttachmentInfo/{id}:
 *   get:
 *     tags: [Attachment]
 *     operatorId: previewAttachmentInfo
 *     description: Preview attachment information
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Attachment ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *
 */
router.route("/previewAttachmentInfo/:attachmentId").get(previewAttachmentInfo);

/**
 * @swagger
 * /api/attachments/previewAttachmentInfoList:
 *   get:
 *     tags: [Attachment]
 *     operatorId: previewAttachmentInfoList
 *     description: Preview attachment information list
 *     responses:
 *       200:
 *         description: Get successful
 *       404:
 *         description: Not Found
 */
router.route("/previewAttachmentInfoList").get(previewAttachmentInfoList);

module.exports = router;