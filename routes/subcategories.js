const express = require("express");
const router = express.Router();

const { getAllSubcategories, getSubcategoryById, createSubcategory, updateSubcategory, deleteSubcategory } = require("../controllers/subcategoryController");

/**
 * @swagger
 * /api/subcategories/getAllSubcategories:
 *   get:
 *     tags: [Subcategory]
 *     operatorId: getAllSubcategories
 *     description: Get all subcategories
 *     parameters:
 *       - in: query
 *         name: search
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllSubcategories").get(getAllSubcategories);

/**
 * @swagger
 * /api/subcategories/getSubCategoryById/{id}:
 *   get:
 *     tags: [Subcategory]
 *     operatorId: getSubcategoryById
 *     description: Get subcategory by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Subcategory ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Not Found
 */
router.route("/getSubcategoryById/:subcategoryId").get(getSubcategoryById);

/**
 * @swagger
 * /api/subcategories/createSubcategory:
 *   post:
 *     tags: [Subcategory]
 *     operatorId: createSubcategory
 *     description: Create new subcategory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subcategory'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.route("/createSubcategory").post(createSubcategory);

/**
 * @swagger
 * /api/subcategories/updateSubcategory/{id}:
 *   put:
 *     tags: [Subcategory]
 *     operatorId: updateSubcategory
 *     description: Update subcategory
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Subcategory ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subcategory'
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/updateSubcategory/:subcategoryId").put(updateSubcategory);

/**
 * @swagger
 * /api/subcategories/deleteSubcategory/{id}:
 *   delete:
 *     tags: [Subcategory]
 *     operatorId: deleteSubcategory
 *     description: Delete subcategory
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Subcategory ID
 *     responses:
 *       200:
 *         description: Deleted
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/deleteSubcategory/:subcategoryId").delete(deleteSubcategory);

module.exports = router;