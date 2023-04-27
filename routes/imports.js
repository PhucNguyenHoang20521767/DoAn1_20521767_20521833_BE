const express = require("express");
const router = express.Router();
const { protect, adminProtect } = require("../middleware/auth");

const { getAllImports, getImportById, createImport, updateImport, deleteImport,
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
router.route("/getAllImports").get(adminProtect, protect, getAllImports);

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
router.route("/getImportById/:importId").get(adminProtect, protect, getImportById);

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
 *               supplierId:
 *                 type: string
 *               importDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.route("/createImport").post(adminProtect, protect, createImport);

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
 *               supplierId:
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
router.route("/updateImport/:importId").put(adminProtect, protect, updateImport);

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
router.route("/deleteImport/:importId").delete(adminProtect, protect, deleteImport);

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
router.route("/getAllImportDetails").get(adminProtect, protect, getAllImportDetails);

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
router.route("/getDetailsForImport/:importId").get(adminProtect, protect, getDetailsForImport);


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
router.route("/getImportDetailById/:importDetailId").get(adminProtect, protect, getImportDetailById);

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
 *               productQuantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.route("/createImportDetail").post(adminProtect, protect, createImportDetail);

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
router.route("/updateImportDetail/:importDetailId").put(adminProtect, protect, updateImportDetail);

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
router.route("/deleteImportDetail/:importDetailId").delete(adminProtect, protect, deleteImportDetail);

module.exports = router;