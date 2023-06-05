const express = require("express");
const router = express.Router();
const { protect, adminProtect } = require("../middleware/auth");
const { uploadMemoryStorage } = require("../config/attachment");

const { registerCustomer, loginGoogleAndFacebookCustomer, loginCustomer, logoutCustomer, sendOTPToCustomer, forgetPasswordCustomer, changePasswordCustomer, verifyCustomerAfterSendOTP, resetPasswordCustomer } = require("../controllers/customer/auth_customer");
const { getAllCustomers, getCustomerById, getCustomerAvatar, getCustomerAvatarURL, saveCustomerAvatar, deleteCustomerAvatar, updateCustomer, updateCustomerByAdmin, deleteCustomer, activeOrInactiveCustomer } = require("../controllers/customer/customerController");

const firebaseStorage = require("../config/firebase");
const { ref, uploadBytesResumable } = require("firebase/storage");

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
 *           schema:
 *             type: object
 *             properties:
 *               customerPassword:
 *                 type: string
 *               customerFirstName:
 *                 type: string
 *               customerLastName:
 *                 type: string
 *               customerBirthday:
 *                 type: string
 *               customerEmail:
 *                 type: string
 *               customerGender:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.route("/registerCustomer").post(registerCustomer);

/**
 * @swagger
 * /api/customers/loginGoogleAndFacebookCustomer:
 *   post:
 *     tags: [Customer]
 *     operatorId: loginGoogleAndFacebookCustomer
 *     description: Login a customer with FB and GG
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerPassword:
 *                 type: string
 *               customerFirstName:
 *                 type: string
 *               customerLastName:
 *                 type: string
 *               customerBirthday:
 *                 type: string
 *               customerEmail:
 *                 type: string
 *               customerGender:
 *                 type: string
 *               customerProvider:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.route("/loginGoogleAndFacebookCustomer").post(loginGoogleAndFacebookCustomer);

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
 * /api/customers/logoutCustomer/{id}:
 *   post:
 *     tags: [Customer]
 *     operatorId: logoutCustomer
 *     description: Logout of system
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/logoutCustomer/:customerId").post(logoutCustomer);

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
 *       201:
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

/**
 * @swagger
 * /api/customers/changePasswordCustomer:
 *   post:
 *     tags: [Customer]
 *     operatorId: changePasswordCustomer
 *     description: Change customer's password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerIdToken
 *               - customerOldPassword
 *               - customerNewPassword
 *             properties:
 *               customerIdToken:
 *                 type: string
 *               customerOldPassword:
 *                 type: string
 *               customerNewPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: Success
 *       401:
 *         description: Invalid Credentials
 *       404:
 *         description: Not Found
 */
router.route("/changePasswordCustomer").post(changePasswordCustomer);

/**
 * @swagger
 * /api/customers/getAllCustomers:
 *   get:
 *     tags: [Customer]
 *     operatorId: getAllCustomers
 *     description: Get all customers
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllCustomers").get(adminProtect, protect, getAllCustomers);

/**
 * @swagger
 * /api/customers/getCustomerById/{id}:
 *   get:
 *     tags: [Customer]
 *     operatorId: getCustomerById
 *     description: Get customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/getCustomerById/:customerId").get(getCustomerById);

/**
 * @swagger
 * /api/customers/getCustomerAvatar:
 *   get:
 *     tags: [Customer]
 *     operatorId: getCustomerAvatar
 *     description: Get customer avatar
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 */
router.route("/getCustomerAvatar").get(protect, getCustomerAvatar);

/**
 * @swagger
 * /api/customers/getCustomerAvatarURL:
 *   get:
 *     tags: [Customer]
 *     operatorId: getCustomerAvatarURL
 *     description: Get customer avatar URL
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 */
router.route("/getCustomerAvatarURL").get(protect, getCustomerAvatarURL);

/**
 * @swagger
 * /api/customers/saveCustomerAvatar:
 *   post:
 *     tags: [Customer]
 *     operatorId: saveCustomerAvatar
 *     description: Save customer avatar
 *     security:
 *       - bearer: []
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
 *         description: Saved
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/saveCustomerAvatar").post(protect, uploadMemoryStorage.array("Files[]"), async (req, res, next) => {
    try {
        if (req.files && req.files.length === 1) {
            req.files.forEach((file) => {
                file.originalname = "customer_" + file.originalname + "_" + Date.now();
                uploadBytesResumable(ref(firebaseStorage, `attachments/${file.originalname}`), file.buffer, { contentType: file.mimetype});
            });
        }
        next();
    } catch (error) {
        next(error);
    }
}, saveCustomerAvatar);

/**
 * @swagger
 * /api/customers/deleteCustomerAvatar:
 *   delete:
 *     tags: [Customer]
 *     operatorId: deleteCustomerAvatar
 *     description: Delete customer avatar
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 */
router.route("/deleteCustomerAvatar").delete(protect, deleteCustomerAvatar);

/**
 * @swagger
 * /api/customers/updateCustomer/{id}:
 *   put:
 *     tags: [Customer]
 *     operatorId: updateCustomer
 *     description: Update customer by ID
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               customerFirstName:
 *                 type: string
 *               customerLastName:
 *                 type: string
 *               customerBirthday:
 *                 type: string
 *               customerEmail:
 *                 type: string
 *               customerGender:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/updateCustomer/:customerId").put(protect, updateCustomer);

/**
 * @swagger
 * /api/customers/updateCustomerByAdmin/{id}:
 *   put:
 *     tags: [Customer]
 *     operatorId: updateCustomerByAdmin
 *     description: Update customer by ID (for ADMIN only)
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               customerPassword:
 *                 type: string
 *               customerFirstName:
 *                 type: string
 *               customerLastName:
 *                 type: string
 *               customerBirthday:
 *                 type: string
 *               customerEmail:
 *                 type: string
 *               customerGender:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/updateCustomerByAdmin/:customerId").put(adminProtect, protect, updateCustomerByAdmin);

/**
 * @swagger
 * /api/customers/deleteCustomer/{id}:
 *   delete:
 *     tags: [Customer]
 *     operatorId: deleteCustomer
 *     description: Delete customer by ID
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/deleteCustomer/:customerId").delete(adminProtect, protect, deleteCustomer);

/**
 * @swagger
 * /api/customers/activeOrInactiveCustomer/{id}:
 *   put:
 *     tags: [Customer]
 *     operatorId: activeOrInactiveCustomer
 *     description: Active or inactive customer by ID
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/activeOrInactiveCustomer/:customerId").put(adminProtect, protect, activeOrInactiveCustomer);

module.exports = router;