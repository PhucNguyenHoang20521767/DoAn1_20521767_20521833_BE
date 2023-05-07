const express = require("express");
const router = express.Router();
const { protect, staffAndAdminProtect } = require("../middleware/auth");

const { getAllSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier } = require("../controllers/supplierController");

/**
 * @swagger
 * /api/suppliers/getAllSuppliers:
 *   get:
 *     tags: [Supplier]
 *     operatorId: getAllSuppliers
 *     description: Get all suppliers
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllSuppliers").get(getAllSuppliers);

/**
 * @swagger
 * /api/suppliers/getSupplierById/{id}:
 *   get:
 *     tags: [Supplier]
 *     operatorId: getSupplierById
 *     description: Get supplier by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Supplier ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/getSupplierById/:supplierId").get(getSupplierById);

/**
 * @swagger
 * /api/suppliers/createSupplier:
 *   post:
 *     tags: [Supplier]
 *     operatorId: createSupplier
 *     description: Create new supplier
 *     security:
 *       - bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.route("/createSupplier").post(staffAndAdminProtect, protect, createSupplier);

/**
 * @swagger
 * /api/suppliers/updateSupplier/{id}:
 *   put:
 *     tags: [Supplier]
 *     operatorId: updateSupplier
 *     description: Update supplier
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Supplier ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/updateSupplier/:supplierId").put(staffAndAdminProtect, protect, updateSupplier);

/**
 * @swagger
 * /api/suppliers/deleteSupplier/{id}:
 *   delete:
 *     tags: [Supplier]
 *     operatorId: deleteSupplier
 *     description: Delete supplier
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Supplier ID
 *     responses:
 *       200:
 *         description: Deleted
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/deleteSupplier/:supplierId").delete(staffAndAdminProtect, protect, deleteSupplier);

module.exports = router;