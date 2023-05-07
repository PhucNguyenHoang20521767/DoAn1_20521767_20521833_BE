const express = require("express");
const router = express.Router();
const { protect, staffAndAdminProtect } = require("../middleware/auth");
const { uploadMemoryStorage } = require("../config/attachment");
const { getAllCampaigns, getCampaignById, createCampaign, saveCampaignImage, updateCampaign, deleteCampaign } = require("../controllers/campaignController");
const firebaseStorage = require("../config/firebase");
const { ref, uploadBytesResumable } = require("firebase/storage");

/**
 * @swagger
 * /api/campaigns/getAllCampaigns:
 *   get:
 *     tags: [Campaign]
 *     operatorId: getAllCampaigns
 *     description: Get all campaigns
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllCampaigns").get(getAllCampaigns);

/**
 * @swagger
 * /api/campaigns/getCampaignById/{id}:
 *   get:
 *     tags: [Campaign]
 *     operatorId: getCampaignById
 *     description: Get campaign by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Campaign ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/getCampaignById/:campaignId").get(getCampaignById);

/**
 * @swagger
 * /api/campaigns/createCampaign:
 *   post:
 *     tags: [Campaign]
 *     operatorId: createCampaign
 *     description: Create new campaign
 *     security:
 *       - bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               campaignName:
 *                 type: string
 *               campaignStartDate:
 *                 type: string
 *               campaignEndDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.route("/createCampaign").post(staffAndAdminProtect, protect, createCampaign);

/**
 * @swagger
 * /api/campaigns/saveCampaignImage/{id}:
 *   post:
 *     tags: [Campaign]
 *     operatorId: saveCampaignImage
 *     description: Save campaign image
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Campaign ID
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
 *     responses:
 *       201:
 *         description: Uploaded
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/saveCampaignImage/:campaignId").post(staffAndAdminProtect, protect, uploadMemoryStorage.array("Files[]"), async (req, res, next) => {
    try {
        if (req.files && req.files.length === 1) {
            req.files.forEach((file) => {
                file.originalname = "campaign_" + file.originalname + "_" + Date.now();
                uploadBytesResumable(ref(firebaseStorage, `attachments/${file.originalname}`), file.buffer, { contentType: file.mimetype});
            });
        }
        next();
    } catch (error) {
        next(error);
    }
}, saveCampaignImage);

/**
 * @swagger
 * /api/campaigns/updateCampaign/{id}:
 *   put:
 *     tags: [Campaign]
 *     operatorId: updateCampaign
 *     description: Update campaign
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Campaign ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               campaignName:
 *                 type: string
 *               campaignStartDate:
 *                 type: string
 *               campaignEndDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/updateCampaign/:campaignId").put(staffAndAdminProtect, protect, updateCampaign);

/**
 * @swagger
 * /api/campaigns/deleteCampaign/{id}:
 *   delete:
 *     tags: [Campaign]
 *     operatorId: deleteCampaign
 *     description: Delete campaign
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Campaign ID
 *     responses:
 *       200:
 *         description: Deleted
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/deleteCampaign/:campaignId").delete(staffAndAdminProtect, protect, deleteCampaign);

module.exports = router;