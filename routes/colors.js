const express = require("express");
const router = express.Router();

const { protect, staffAndAdminProtect } = require("../middleware/auth");
const { getAllColors, getColorById, createColor, updateColor, deleteColor } = require("../controllers/colorController");

/**
 * @swagger
 * /api/colors/getAllColors:
 *   get:
 *     tags: [Color]
 *     operatorId: getAllColors
 *     description: Get all colors
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllColors").get(getAllColors);

/**
 * @swagger
 * /api/colors/getColorById/{id}:
 *   get:
 *     tags: [Color]
 *     operatorId: getColorById
 *     description: Get product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Color ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/getColorById/:colorId").get(getColorById);

/**
 * @swagger
 * /api/colors/createColor:
 *   post:
 *     tags: [Color]
 *     operatorId: createColor
 *     description: Create product
 *     security:
 *       - bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               colorName:
 *                 type: string
 *               colorHex:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/createColor").post(staffAndAdminProtect, protect, createColor);

/**
 * @swagger
 * /api/colors/updateColor/{id}:
 *   put:
 *     tags: [Color]
 *     operatorId: updateColor
 *     description: Update product by ID
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Color ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               colorName:
 *                 type: string
 *               colorHex:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/updateColor/:colorId").put(staffAndAdminProtect, protect, updateColor);

/**
 * @swagger
 * /api/colors/deleteColor/{id}:
 *   delete:
 *     tags: [Color]
 *     operatorId: deleteColor
 *     description: Delete product by ID
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Color ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/deleteColor/:colorId").delete(staffAndAdminProtect, protect, deleteColor);

module.exports = router;