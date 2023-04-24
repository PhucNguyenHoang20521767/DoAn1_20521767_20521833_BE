const express = require("express");
const router = express.Router();
const { protect, staffAndAdminProtect } = require("../middleware/auth");

const { getAllDiscounts, getDiscountById, createDiscount, updateDiscount, deleteDiscount } = require("../controllers/discountController");

/**
 * @swagger
 * /api/discounts/getAllDiscounts:
 *   get:
 *     tags: [Discount]
 *     operatorId: getAllDiscounts
 *     description: Get all discounts
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllDiscounts").get(staffAndAdminProtect, protect, getAllDiscounts);

/**
 * @swagger
 * /api/discounts/getDiscountById/{id}:
 *   get:
 *     tags: [Discount]
 *     operatorId: getDiscountById
 *     description: Get discount by ID
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
router.route("/getDiscountById/:discountId").get(staffAndAdminProtect, protect, getDiscountById);

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