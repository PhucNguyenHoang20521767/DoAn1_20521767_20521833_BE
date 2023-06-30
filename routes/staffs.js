const express = require("express");
const router = express.Router();
const { protect, staffAndAdminProtect, adminProtect } = require("../middleware/auth");

const { registerStaff, loginStaff } = require("../controllers/staff/auth_staff");
const { getCurrentStaff, getAllStaffs, getStaffById, updateStaff, changeStaffPassword, deleteStaff, activeOrInactiveStaff } = require("../controllers/staff/staffController");

/**
 * @swagger
 * /api/staffs/registerStaff:
 *   post:
 *     tags: [Staff]
 *     operatorId: registerStaff
 *     description: Register a staff
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
 *               - privilege
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
 *               privilege:
 *                 type: number
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/registerStaff").post(adminProtect, protect, registerStaff);

/**
 * @swagger
 * /api/staffs/loginStaff:
 *   post:
 *     tags: [Staff]
 *     operatorId: loginStaff
 *     description: Login by staff account
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
router.route("/loginStaff").post(loginStaff);

/**
 * @swagger
 * /api/staffs/getCurrentStaff:
 *   get:
 *     tags: [Staff]
 *     operatorId: getCurrentStaff
 *     description: Get current staff
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Success
 */
router.route("/getCurrentStaff").get(staffAndAdminProtect, protect, getCurrentStaff);

/**
 * @swagger
 * /api/staffs/getAllStaffs:
 *   get:
 *     tags: [Staff]
 *     operatorId: getAllStaffs
 *     description: Get all staffs
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllStaffs").get(adminProtect, protect, getAllStaffs);

/**
 * @swagger
 * /api/staffs/getStaffById/{id}:
 *   get:
 *     tags: [Staff]
 *     operatorId: getStaffById
 *     description: Get staff by ID
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Staff ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/getStaffById/:staffId").get(staffAndAdminProtect, protect, getStaffById);

/**
 * @swagger
 * /api/staffs/updateStaff/{id}:
 *   put:
 *     tags: [Staff]
 *     operatorId: updateStaff
 *     description: Update staff by ID
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Staff ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
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
 *               privilege:
 *                 type: number
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/updateStaff/:staffId").put(adminProtect, protect, updateStaff);

/**
 * @swagger
 * /api/staffs/changeStaffPassword/{id}:
 *   post:
 *     tags: [Staff]
 *     operatorId: changeStaffPassword
 *     description: Change staff's password
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Staff ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - staffOldPassword
 *               - staffNewPassword
 *             properties:
 *               staffOldPassword:
 *                 type: string
 *               staffNewPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: Success
 *       401:
 *         description: Invalid Credentials
 *       404:
 *         description: Not Found
 */
router.route("/changeStaffPassword/:staffId").post(staffAndAdminProtect, protect, changeStaffPassword);

/**
 * @swagger
 * /api/staffs/deleteStaff/{id}:
 *   delete:
 *     tags: [Staff]
 *     operatorId: deleteStaff
 *     description: Delete staff by ID
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Staff ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/deleteStaff/:staffId").delete(adminProtect, protect, deleteStaff);

/**
 * @swagger
 * /api/staffs/activeOrInactiveStaff/{id}:
 *   put:
 *     tags: [Staff]
 *     operatorId: activeOrInactiveStaff
 *     description: Active or inactive staff by ID
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Staff ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/activeOrInactiveStaff/:staffId").put(adminProtect, protect, activeOrInactiveStaff);

module.exports = router;