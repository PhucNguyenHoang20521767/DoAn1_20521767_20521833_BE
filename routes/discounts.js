const express = require("express");
const router = express.Router();
const { query } = require("../middleware/query");
const { protect, staffAndAdminProtect, adminProtect } = require("../middleware/auth");
const { uploadMemoryStorage } = require("../config/attachment");

const { getAllDiscounts, getAllValidDiscounts, getDiscountById, getAllProductsForDiscount, resetDiscount, applyDiscountForProduct, createDiscount, saveDiscountThumbnail, updateDiscount, deleteDiscount } = require("../controllers/discountController");

const firebaseStorage = require("../config/firebase");
const { ref, uploadBytesResumable } = require("firebase/storage");

/**
 * @swagger
 * /api/discounts/getAllDiscounts:
 *   get:
 *     tags: [Discount]
 *     operatorId: getAllDiscounts
 *     description: Get all discounts
 *     parameters:
 *       - in: query
 *         name: search
 *         type: string
 *         description: Search by discount name
 *       - in: query
 *         name: page
 *         type: string
 *         description: Specify page number
 *       - in: query
 *         name: limit
 *         type: string
 *         description: Limit the number of rows returned from a query
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllDiscounts").get(query, getAllDiscounts);

/**
 * @swagger
 * /api/discounts/getAllValidDiscounts:
 *   get:
 *     tags: [Discount]
 *     operatorId: getAllValidDiscounts
 *     description: Get all valid discounts
 *     parameters:
 *       - in: query
 *         name: search
 *         type: string
 *         description: Search by discount name
 *       - in: query
 *         name: page
 *         type: string
 *         description: Specify page number
 *       - in: query
 *         name: limit
 *         type: string
 *         description: Limit the number of rows returned from a query
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllValidDiscounts").get(query, getAllValidDiscounts);

/**
 * @swagger
 * /api/discounts/getDiscountById/{id}:
 *   get:
 *     tags: [Discount]
 *     operatorId: getDiscountById
 *     description: Get discount by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Discount ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/getDiscountById/:discountId").get(getDiscountById);

/**
 * @swagger
 * /api/discounts/getAllProductsForDiscount/{id}:
 *   get:
 *     tags: [Discount]
 *     operatorId: getAllProductsForDiscount
 *     description: Get all products for discount
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Discount ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/getAllProductsForDiscount/:discountId").get(getAllProductsForDiscount);

/**
 * @swagger
 * /api/discounts/resetDiscount/{id}:
 *   put:
 *     tags: [Discount]
 *     operatorId: resetDiscount
 *     description: Reset discount
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Discount ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/resetDiscount/:discountId").put(adminProtect, protect, resetDiscount);

/**
 * @swagger
 * /api/discounts/applyDiscountForProduct/{id}/{discountId}:
 *   put:
 *     tags: [Discount]
 *     operatorId: applyDiscountForProduct
 *     description: Apply discount for product
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product ID
 *       - in: path
 *         name: discountId
 *         required: true
 *         type: string
 *         description: Discount ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/applyDiscountForProduct/:productId/:discountId").put(adminProtect, protect, applyDiscountForProduct);

/**
 * @swagger
 * /api/discounts/createDiscount:
 *   post:
 *     tags: [Discount]
 *     operatorId: createDiscount
 *     description: Create new discount
 *     security:
 *       - bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Discount'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.route("/createDiscount").post(staffAndAdminProtect, protect, createDiscount);

/**
 * @swagger
 * /api/discounts/saveDiscountThumbnail/{id}:
 *   post:
 *     tags: [Discount]
 *     operatorId: saveDiscountThumbnail
 *     description: Save discount's thumbnail
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Discount ID
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
 *       200:
 *         description: Saved
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/saveDiscountThumbnail/:discountId").post(staffAndAdminProtect, protect, uploadMemoryStorage.array("Files[]"), async (req, res, next) => {
    try {
        if (req.files) {
            req.files.forEach((file) => {
                file.originalname = "discountThumbnail_" + file.originalname + "_" + Date.now();
                req.thumbnailOriginalName = file.originalname;
                uploadBytesResumable(ref(firebaseStorage, `attachments/${file.originalname}`), file.buffer, { contentType: file.mimetype});
            });
        }

        setTimeout(() => {
            next();
        }, 10000);
    } catch (error) {
        next(error);
    }
}, saveDiscountThumbnail);

/**
 * @swagger
 * /api/discounts/updateDiscount/{id}:
 *   put:
 *     tags: [Discount]
 *     operatorId: updateDiscount
 *     description: Update discount
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Discount ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Discount'
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/updateDiscount/:discountId").put(staffAndAdminProtect, protect, updateDiscount);

/**
 * @swagger
 * /api/discounts/deleteDiscount/{id}:
 *   delete:
 *     tags: [Discount]
 *     operatorId: deleteDiscount
 *     description: Delete discount
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Discount ID
 *     responses:
 *       200:
 *         description: Deleted
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/deleteDiscount/:discountId").delete(staffAndAdminProtect, protect, deleteDiscount);

module.exports = router;