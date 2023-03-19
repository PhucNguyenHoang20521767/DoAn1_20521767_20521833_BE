const express = require("express");
const router = express.Router();

const { registerCustomer, loginCustomer, verifyCustomerAfterSendOTP } = require("../controllers/customer/auth_customer");

/**
 * @swagger
 * /api/customers/registerCustomer:
 *   post:
 *     tags: [Customer]
 *     operatorId: registerCustomer
 *     description: Register a customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.route("/registerCustomer").post(registerCustomer);

/**
 * @swagger
 * /api/customers/loginCustomer:
 *   post:
 *     tags: [Customer]
 *     operatorId: loginCustomer
 *     description: Login by customer account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerEmail
 *               - customerPassword
 *             properties:
 *               customerEmail:
 *                 type: string
 *               customerPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Invalid credentials
 */
router.route("/loginCustomer").post(loginCustomer);

/**
 * @swagger
 * /api/customers/verifyCustomerAfterSendOTP:
 *   post:
 *     tags: [Customer]
 *     operatorId: verifyCustomerAfterSendOTP
 *     description: Verify customer's account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerIdToken
 *               - customerOTP
 *             properties:
 *               customerIdToken:
 *                 type: string
 *               customerOTP:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authorized
 *       401:
 *         description: Not authorized
 *       404:
 *         description: No OTP Request Found
 */
router.route("/verifyCustomerAfterSendOTP").post(verifyCustomerAfterSendOTP);

module.exports = router;