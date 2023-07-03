const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { uploadMemoryStorage } = require("../config/attachment");

const { getAllFeedbacks, getAllProductFeedbacks, getProductRating, getFeedbackById, createFeedback, updateFeedback, deleteFeedback,
        getAllFeedbackImages, saveFeedbackImage, deleteFeedbackImage } = require("../controllers/feedbackController");

const firebaseStorage = require("../config/firebase");
const { ref, uploadBytesResumable } = require("firebase/storage");

/**
 * @swagger
 * /api/feedbacks/getAllFeedbacks:
 *   get:
 *     tags: [Feedback]
 *     operatorId: getAllFeedbacks
 *     description: Get all feedbacks
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllFeedbacks").get(getAllFeedbacks);

/**
 * @swagger
 * /api/feedbacks/getAllProductFeedbacks/{id}:
 *   get:
 *     tags: [Feedback]
 *     operatorId: getAllProductFeedbacks
 *     description: Get all product feedbacks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllProductFeedbacks/:productId").get(getAllProductFeedbacks);

/**
 * @swagger
 * /api/feedbacks/getProductRating/{id}:
 *   get:
 *     tags: [Feedback]
 *     operatorId: getProductRating
 *     description: Get product rating
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getProductRating/:productId").get(getProductRating);

/**
 * @swagger
 * /api/feedbacks/getFeedbackById/{id}:
 *   get:
 *     tags: [Feedback]
 *     operatorId: getFeedbackById
 *     description: Get feedback by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Feedback ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/getFeedbackById/:feedbackId").get(getFeedbackById);

/**
 * @swagger
 * /api/feedbacks/createFeedback:
 *   post:
 *     tags: [Feedback]
 *     operatorId: createFeedback
 *     description: Create new feedback
 *     security:
 *       - bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               customerId:
 *                 type: string
 *               productId:
 *                 type: string
 *               productColorId:
 *                 type: string
 *               orderId:
 *                 type: string
 *               feedbackRating:
 *                 type: number
 *               feedbackTitle:
 *                 type: string
 *               feedbackContent:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.route("/createFeedback").post(protect, createFeedback);

/**
 * @swagger
 * /api/feedbacks/updateFeedback/{id}:
 *   put:
 *     tags: [Feedback]
 *     operatorId: updateFeedback
 *     description: Update feedback
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Feedback ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               customerId:
 *                 type: string
 *               productId:
 *                 type: string
 *               productColorId:
 *                 type: string
 *               orderId:
 *                 type: string
 *               feedbackRating:
 *                 type: number
 *               feedbackTitle:
 *                 type: string
 *               feedbackContent:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/updateFeedback/:feedbackId").put(protect, updateFeedback);

/**
 * @swagger
 * /api/feedbacks/deleteFeedback/{id}:
 *   delete:
 *     tags: [Feedback]
 *     operatorId: deleteFeedback
 *     description: Delete feedback
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Feedback ID
 *     responses:
 *       200:
 *         description: Deleted
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/deleteFeedback/:feedbackId").delete(protect, deleteFeedback);

/**
 * @swagger
 * /api/feedbacks/getAllFeedbackImages/{id}:
 *   get:
 *     tags: [Feedback Image]
 *     operatorId: getAllFeedbackImages
 *     description: Get all feedback images
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Feedback ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllFeedbackImages/:feedbackId").get(getAllFeedbackImages);

/**
 * @swagger
 * /api/feedbacks/saveFeedbackImage/{id}:
 *   post:
 *     tags: [Feedback Image]
 *     operatorId: saveFeedbackImage
 *     description: Save feedback image
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Feedback ID
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
 *         description: Upload Successful
 *       400:
 *         description: Not Found
 */
router.route("/saveFeedbackImage/:feedbackId").post(protect, uploadMemoryStorage.array("Files[]"), async (req, res, next) => {
    try {
        if (req.files) {
            req.files.forEach((file) => {
                file.originalname = "feedback_" + file.originalname + "_" + Date.now();
                uploadBytesResumable(ref(firebaseStorage, `attachments/${file.originalname}`), file.buffer, { contentType: file.mimetype});
            });
        }
        next();
    } catch (error) {
        next(error);
    }
}, saveFeedbackImage);

/**
 * @swagger
 * /api/feedbacks/deleteFeedbackImage/{id}:
 *   delete:
 *     tags: [Feedback Image]
 *     operatorId: deleteFeedbackImage
 *     description: Delete feedback image
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Feedback Image ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/deleteFeedbackImage/:feedbackImageId").delete(protect, deleteFeedbackImage);

module.exports = router;