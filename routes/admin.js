const express = require("express");
const router = express.Router();
const { protect, adminProtect } = require("../middleware/auth");

const { registerAdmin, loginAdmin } = require("../controllers/admin/auth_admin");

/**
 * @swagger
 * /api/admin/registerAdmin:
 *   post:
 *     tags: [Admin]
 *     operatorId: registerAdmin
 *     description: Register admin
 *     security:
 *       - bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - staffPassword
 *               - staffFirstName
 *               - staffLastName
 *               - staffEmail
 *               - staffPhone
 *               - staffGender
 *             properties:
 *               staffPassword:
 *                 type: string
 *               staffFirstName:
 *                 type: string
 *               staffLastName:
 *                 type: string
 *               staffEmail:
 *                 type: string
 *               staffPhone:
 *                 type: string
 *               staffGender:
 *                 type: string
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/registerAdmin").post(adminProtect, protect, registerAdmin);

/**
 * @swagger
 * /api/admin/loginAdmin:
 *   post:
 *     tags: [Admin]
 *     operatorId: loginAdmin
 *     description: Login by admin account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - staffEmail
 *               - staffPassword
 *             properties:
 *               staffEmail:
 *                 type: string
 *               staffPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Invalid credentials
 */
router.route("/loginAdmin").post(loginAdmin);

module.exports = router;