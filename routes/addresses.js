const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const { getAllAddresses, getAllCustomerAddresses, getAddressById, createAddress, updateAddress, deleteAddress, setDefaultAddress } = require("../controllers/addressController");

/**
 * @swagger
 * /api/addresses/getAllAddresses:
 *   get:
 *     tags: [Address]
 *     operatorId: getAllAddresses
 *     description: Get all addresses
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllAddresses").get(protect, getAllAddresses);

/**
 * @swagger
 * /api/addresses/getAllCustomerAddresses/{id}:
 *   get:
 *     tags: [Address]
 *     operatorId: getAllCustomerAddresses
 *     description: Get all customer addresses
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
 */
router.route("/getAllCustomerAddresses/:customerId").get(protect, getAllCustomerAddresses);


/**
 * @swagger
 * /api/addresses/getAddressById/{id}:
 *   get:
 *     tags: [Address]
 *     operatorId: getAddressById
 *     description: Get address by ID
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Address ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/getAddressById/:addressId").get(protect, getAddressById);

/**
 * @swagger
 * /api/addresses/createAddress/{id}:
 *   post:
 *     tags: [Address]
 *     operatorId: createAddress
 *     description: Create new address
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
 *               receiverFirstName:
 *                 type: string
 *               receiverLastName:
 *                 type: string
 *               receiverPhone:
 *                 type: string
 *               receiverAddress:
 *                 type: string
 *               receiverWard:
 *                 type: string
 *               receiverDistrict:
 *                 type: string
 *               receiverCity:
 *                 type: string
 *               isDefault:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.route("/createAddress/:customerId").post(protect, createAddress);

/**
 * @swagger
 * /api/addresses/updateAddress/{id}:
 *   put:
 *     tags: [Address]
 *     operatorId: updateAddress
 *     description: Update address
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Address ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               receiverFirstName:
 *                 type: string
 *               receiverLastName:
 *                 type: string
 *               receiverPhone:
 *                 type: string
 *               receiverAddress:
 *                 type: string
 *               receiverWard:
 *                 type: string
 *               receiverDistrict:
 *                 type: string
 *               receiverCity:
 *                 type: string
 *               isDefault:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/updateAddress/:addressId").put(protect, updateAddress);

/**
 * @swagger
 * /api/addresses/deleteAddress/{id}:
 *   delete:
 *     tags: [Address]
 *     operatorId: deleteAddress
 *     description: Delete address
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Address ID
 *     responses:
 *       200:
 *         description: Deleted
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/deleteAddress/:addressId").delete(protect, deleteAddress);

/**
 * @swagger
 * /api/addresses/setDefaultAddress/{id}:
 *   put:
 *     tags: [Address]
 *     operatorId: setDefaultAddress
 *     description: Active or inactive address by ID
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Address ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/setDefaultAddress/:addressId").put(protect, setDefaultAddress);

module.exports = router;