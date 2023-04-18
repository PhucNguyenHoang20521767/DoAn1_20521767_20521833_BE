const express = require("express");
const router = express.Router();

const { uploadMemoryStorage } = require("../config/attachment");
const { protect, staffAndAdminProtect, adminProtect } = require("../middleware/auth");
const { getAllProductImages, saveProductImage, deleteProductImage } = require("../controllers/productController");

const firebaseStorage = require("../config/firebase");
const { ref, uploadBytesResumable } = require("firebase/storage");

/**
 * @swagger
 * /api/products/getAllProductImages/{id}:
 *   get:
 *     tags: [Product]
 *     operatorId: getAllProductImages
 *     description: Get all product images
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
router.route("/getAllProductImages/:productId").get(staffAndAdminProtect, protect, getAllProductImages);

/**
 * @swagger
 * /api/products/saveProductImage/{id}:
 *   post:
 *     tags: [Product]
 *     operatorId: saveProductImage
 *     description: Save product image
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product ID
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
router.route("/saveProductImage/:productId").post(staffAndAdminProtect, protect, uploadMemoryStorage.array("Files[]"), async (req, res, next) => {
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
}, saveProductImage);

/**
 * @swagger
 * /api/products/deleteProductImage/{id}:
 *   delete:
 *     tags: [Product]
 *     operatorId: deleteProductImage
 *     description: Delete product image
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product Image ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/deleteProductImage/:productImageId").delete(staffAndAdminProtect, protect, deleteProductImage);

module.exports = router;