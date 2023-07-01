const express = require("express");
const router = express.Router();
const { protect, staffAndAdminProtect, adminProtect } = require("../middleware/auth");

const { getAllDiscounts, getDiscountById, applyDiscountForProduct, createDiscount, updateDiscount, deleteDiscount } = require("../controllers/discountController");

/**
 * @swagger
 * /api/discounts/getAllDiscounts:
 *   get:
 *     tags: [Discount]
 *     operatorId: getAllDiscounts
 *     description: Get all discounts
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllDiscounts").get(getAllDiscounts);

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
 * /api/discounts/applyDiscountForProduct/{id}/{discountId}:
 *   get:
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
router.route("/applyDiscountForProduct/:productId/:discountId").get(adminProtect, protect, applyDiscountForProduct);

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