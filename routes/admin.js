const express = require("express");
const router = express.Router();

const { registerAdmin, loginAdmin } = require("../controllers/admin/auth_admin");

/**
 * @swagger
 * /api/admin/registerAdmin:
 *   post:
 *     tags: [Admin]
 *     operatorId: registerAdmin
 *     description: Register admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - staffLoginName
 *               - staffPassword
 *               - staffFirstName
 *               - staffLastName
 *               - staffEmail
 *               - staffPhone
 *               - staffGender
 *             properties:
 *               staffLoginName:
 *                 type: string
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
router.route("/registerAdmin").post(registerAdmin);

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
 *               - staffLoginName
 *               - staffPassword
 *             properties:
 *               staffLoginName:
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