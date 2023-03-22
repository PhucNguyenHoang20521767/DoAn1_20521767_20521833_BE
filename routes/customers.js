const express = require("express");
const router = express.Router();

const { registerCustomer, loginCustomer, sendOTPToCustomer, forgetPasswordCustomer, resetPasswordCustomer, verifyCustomerAfterSendOTP } = require("../controllers/customer/auth_customer");

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
 * /api/customers/sendOTPCustomer:
 *   post:
 *     tags: [Customer]
 *     operatorId: sendOTPCustomer
 *     description: Send OTP to customer's email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerEmail
 *             properties:
 *               customerEmail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Invalid credentials
 */
router.route("/sendOTPCustomer").post(sendOTPToCustomer);

/**
 * @swagger
 * /api/customers/forgetPasswordCustomer:
 *   post:
 *     tags: [Customer]
 *     operatorId: forgetPasswordCustomer
 *     description: Reset password request from customers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerEmail
 *             properties:
 *               customerEmail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Invalid Credentials
 */
router.route("/forgetPasswordCustomer").post(forgetPasswordCustomer);

/**
 * @swagger
 * /api/customers/resetPasswordCustomer:
 *   post:
 *     tags: [Customer]
 *     operatorId: resetPasswordCustomer
 *     description: Accept reset password request from customers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerIdToken
 *               - customerOTP
 *               - customerPassword
 *             properties:
 *               customerIdToken:
 *                 type: string
 *               customerOTP:
 *                 type: string
 *               customerPassword:
 *                 type: string
 *     responses:
 *       204:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Invalid Credentials
 */
router.route("/resetPasswordCustomer").post(resetPasswordCustomer);

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