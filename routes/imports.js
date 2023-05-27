const express = require("express");
const router = express.Router();
const { protect, staffAndAdminProtect, adminProtect } = require("../middleware/auth");

const { getAllImports, getImportById, createImport, updateImport, deleteImport, confirmImport, cancelImport,
        getAllImportDetails, getDetailsForImport, getImportDetailById, createImportDetail, updateImportDetail, deleteImportDetail } = require("../controllers/importController");

/**
 * @swagger
 * /api/imports/getAllImports:
 *   get:
 *     tags: [Import]
 *     operatorId: getAllImports
 *     description: Get all imports
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllImports").get(staffAndAdminProtect, protect, getAllImports);

/**
 * @swagger
 * /api/imports/getImportById/{id}:
 *   get:
 *     tags: [Import]
 *     operatorId: getImportById
 *     description: Get import by ID
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Import ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/getImportById/:importId").get(staffAndAdminProtect, protect, getImportById);

/**
 * @swagger
 * /api/imports/createImport:
 *   post:
 *     tags: [Import]
 *     operatorId: createImport
 *     description: Create new import
 *     security:
 *       - bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               staffId:
 *                 type: string
 *               importDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.route("/createImport").post(staffAndAdminProtect, protect, createImport);

/**
 * @swagger
 * /api/imports/updateImport/{id}:
 *   put:
 *     tags: [Import]
 *     operatorId: updateImport
 *     description: Update import
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Import ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               staffId:
 *                 type: string
 *               importDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/updateImport/:importId").put(staffAndAdminProtect, protect, updateImport);

/**
 * @swagger
 * /api/imports/deleteImport/{id}:
 *   delete:
 *     tags: [Import]
 *     operatorId: deleteImport
 *     description: Delete import
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Import ID
 *     responses:
 *       200:
 *         description: Deleted
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/deleteImport/:importId").delete(staffAndAdminProtect, protect, deleteImport);

/**
 * @swagger
 * /api/imports/confirmImport/{id}:
 *   put:
 *     tags: [Import]
 *     operatorId: confirmImport
 *     description: Confirm import
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Import ID
 *     responses:
 *       200:
 *         description: Confirmed
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/confirmImport/:importId").put(adminProtect, protect, confirmImport);

/**
 * @swagger
 * /api/imports/cancelImport/{id}:
 *   put:
 *     tags: [Import]
 *     operatorId: cancelImport
 *     description: Cancel import
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Import ID
 *     responses:
 *       200:
 *         description: Canceled
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/cancelImport/:importId").put(adminProtect, protect, cancelImport);


/**
 * @swagger
 * /api/imports/getAllImportDetails:
 *   get:
 *     tags: [Import Detail]
 *     operatorId: getAllImportDetails
 *     description: Get all import details
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllImportDetails").get(staffAndAdminProtect, protect, getAllImportDetails);

/**
 * @swagger
 * /api/imports/getDetailsForImport/{id}:
 *   get:
 *     tags: [Import Detail]
 *     operatorId: getDetailsForImport
 *     description: Get details for import
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Import ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/getDetailsForImport/:importId").get(staffAndAdminProtect, protect, getDetailsForImport);


/**
 * @swagger
 * /api/imports/getImportDetailById/{id}:
 *   get:
 *     tags: [Import Detail]
 *     operatorId: getImportDetailById
 *     description: Get import detail by ID
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Import detail ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/getImportDetailById/:importDetailId").get(staffAndAdminProtect, protect, getImportDetailById);

/**
 * @swagger
 * /api/imports/createImportDetail:
 *   post:
 *     tags: [Import Detail]
 *     operatorId: createImportDetail
 *     description: Create new import detail
 *     security:
 *       - bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               importId:
 *                 type: string
 *               productId:
 *                 type: string
 *               supplierId:
 *                 type: string
 *               productColorId:
 *                 type: string
 *               productQuantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.route("/createImportDetail").post(staffAndAdminProtect, protect, createImportDetail);

/**
 * @swagger
 * /api/imports/updateImportDetail/{id}:
 *   put:
 *     tags: [Import Detail]
 *     operatorId: updateImportDetail
 *     description: Update import detail
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Import detail ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               importId:
 *                 type: string
 *               productId:
 *                 type: string
 *               supplierId:
 *                 type: string
 *               productColorId:
 *                 type: string
 *               productQuantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/updateImportDetail/:importDetailId").put(staffAndAdminProtect, protect, updateImportDetail);

/**
 * @swagger
 * /api/imports/deleteImportDetail/{id}:
 *   delete:
 *     tags: [Import Detail]
 *     operatorId: deleteImportDetail
 *     description: Delete import detail
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Import detail ID
 *     responses:
 *       200:
 *         description: Deleted
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/deleteImportDetail/:importDetailId").delete(staffAndAdminProtect, protect, deleteImportDetail);

module.exports = router;