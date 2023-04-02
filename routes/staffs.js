const express = require("express");
const router = express.Router();

const { registerStaff, loginStaff } = require("../controllers/staff/auth_staff");
const { getAllStaffs, getStaffById, updateStaff, deleteStaff, activeOrInactiveStaff } = require("../controllers/staff/staffController");

/**
 * @swagger
 * /api/staffs/registerStaff:
 *   post:
 *     tags: [Staff]
 *     operatorId: registerStaff
 *     description: Register a staff
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
router.route("/registerStaff").post(registerStaff);

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
 * /api/staffs/getAllStaffs:
 *   get:
 *     tags: [Staff]
 *     operatorId: getAllStaffs
 *     description: Get all staffs
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllStaffs").get(getAllStaffs);

/**
 * @swagger
 * /api/staffs/getStaffById/{id}:
 *   get:
 *     tags: [Staff]
 *     operatorId: getStaffById
 *     description: Get staff by ID
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
router.route("/getStaffById/:staffId").get(getStaffById);

/**
 * @swagger
 * /api/staffs/updateStaff/{id}:
 *   put:
 *     tags: [Staff]
 *     operatorId: updateStaff
 *     description: Update staff by ID
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
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/updateStaff/:staffId").put(updateStaff);

/**
 * @swagger
 * /api/staffs/deleteStaff/{id}:
 *   delete:
 *     tags: [Staff]
 *     operatorId: deleteStaff
 *     description: Delete staff by ID
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
router.route("/deleteStaff/:staffId").delete(deleteStaff);

/**
 * @swagger
 * /api/staffs/activeOrInactiveStaff/{id}:
 *   put:
 *     tags: [Staff]
 *     operatorId: activeOrInactiveStaff
 *     description: Active or inactive staff by ID
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
router.route("/activeOrInactiveStaff/:staffId").put(activeOrInactiveStaff);

module.exports = router;