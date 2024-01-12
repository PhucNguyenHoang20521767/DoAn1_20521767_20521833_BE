const express = require("express");
const router = express.Router();
const { query } = require("../middleware/query");
const { protect, adminProtect } = require("../middleware/auth");

const {
    getAllValidVouchers,
    getAllVouchers,
    getVoucherById,
    createVoucher,
    updateVoucher,
    deleteVoucher,
    activeOrInactiveVoucher
} = require("../controllers/voucherController");

/**
 * @swagger
 * /api/vouchers/getAllValidVouchers:
 *   get:
 *     tags: [Voucher]
 *     operatorId: getAllValidVouchers
 *     description: Get all valid vouchers
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllValidVouchers").get(protect, getAllValidVouchers);

/**
 * @swagger
 * /api/vouchers/getAllVouchers:
 *   get:
 *     tags: [Voucher]
 *     operatorId: getAllVouchers
 *     description: Get all vouchers
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: query
 *         name: search
 *         type: string
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
router.route("/getAllVouchers").get(adminProtect, protect, query, getAllVouchers);

/**
 * @swagger
 * /api/vouchers/getVoucherById/{id}:
 *   get:
 *     tags: [Voucher]
 *     operatorId: getVoucherById
 *     description: Get voucher by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Voucher ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/getVoucherById/:voucherId").get(getVoucherById);

/**
 * @swagger
 * /api/vouchers/createVoucher:
 *   post:
 *     tags: [Voucher]
 *     operatorId: createVoucher
 *     description: Create voucher
 *     security:
 *       - bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               voucherType:
 *                 type: string
 *               voucherValue:
 *                 type: number
 *               minOrderPrice:
 *                 type: number
 *               maxDiscountPrice:
 *                 type: number
 *               voucherEndDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.route("/createVoucher").post(adminProtect, protect, createVoucher);

/**
 * @swagger
 * /api/vouchers/updateVoucher/{id}:
 *   put:
 *     tags: [Voucher]
 *     operatorId: updateVoucher
 *     description: Delete voucher
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Voucher ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               voucherType:
 *                 type: string
 *               voucherValue:
 *                 type: number
 *               minOrderPrice:
 *                 type: number
 *               maxDiscountPrice:
 *                 type: number
 *               voucherEndDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/updateVoucher/:voucherId").put(adminProtect, protect, updateVoucher);

/**
 * @swagger
 * /api/vouchers/deleteVoucher/{id}:
 *   delete:
 *     tags: [Voucher]
 *     operatorId: deleteVoucher
 *     description: Delete voucher
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Voucher ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/deleteVoucher/:voucherId").delete(adminProtect, protect, deleteVoucher);

/**
 * @swagger
 * /api/vouchers/activeOrInactiveVoucher/{id}:
 *   put:
 *     tags: [Voucher]
 *     operatorId: activeOrInactiveVoucher
 *     description: Active or inactive voucher
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Voucher ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/activeOrInactiveVoucher/:voucherId").put(adminProtect, protect, activeOrInactiveVoucher);

module.exports = router;