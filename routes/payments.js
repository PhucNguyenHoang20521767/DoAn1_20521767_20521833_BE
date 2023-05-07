const express = require("express");
const router = express.Router();
const { protect, adminProtect } = require("../middleware/auth");

const { getAllPayments, getPaymentById, createPayment, updatePayment, deletePayment, activeOrInactivePayment } = require("../controllers/paymentController");

/**
 * @swagger
 * /api/payments/getAllPayments:
 *   get:
 *     tags: [Payment]
 *     operatorId: getAllPayments
 *     description: Get all payments
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllPayments").get(getAllPayments);

/**
 * @swagger
 * /api/payments/getPaymentById/{id}:
 *   get:
 *     tags: [Payment]
 *     operatorId: getPaymentById
 *     description: Get payment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/getPaymentById/:paymentId").get(getPaymentById);

/**
 * @swagger
 * /api/payments/createPayment:
 *   post:
 *     tags: [Payment]
 *     operatorId: createPayment
 *     description: Create new payment
 *     security:
 *       - bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               paymentType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.route("/createPayment").post(adminProtect, protect, createPayment);

/**
 * @swagger
 * /api/payments/updatePayment/{id}:
 *   put:
 *     tags: [Payment]
 *     operatorId: updatePayment
 *     description: Update payment
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Payment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               paymentType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/updatePayment/:paymentId").put(adminProtect, protect, updatePayment);

/**
 * @swagger
 * /api/payments/deletePayment/{id}:
 *   delete:
 *     tags: [Payment]
 *     operatorId: deletePayment
 *     description: Delete payment
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Deleted
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/deletePayment/:paymentId").delete(adminProtect, protect, deletePayment);

/**
 * @swagger
 * /api/payments/activeOrInactivePayment/{id}:
 *   put:
 *     tags: [Payment]
 *     operatorId: activeOrInactivePayment
 *     description: Active or inactive payment by ID
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/activeOrInactivePayment/:paymentId").put(adminProtect, protect, activeOrInactivePayment);

module.exports = router;