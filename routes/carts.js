const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const { getCustomerCart, createCart, deleteCart, activeOrInactiveCart,
    getAllCartItems, addItemToCart, updateItemInCart, removeItemFromCart, removeAllCartItems, removeAllItemsFromCart } = require("../controllers/cartController");

/**
 * @swagger
 * /api/carts/getCustomerCart:
 *   get:
 *     tags: [Cart]
 *     operatorId: getCustomerCart
 *     description: Get all carts
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getCustomerCart").get(protect, getCustomerCart);

/**
 * @swagger
 * /api/carts/createCart:
 *   post:
 *     tags: [Cart]
 *     operatorId: createCart
 *     description: Create cart for customer
 *     security:
 *       - bearer: []
 *     responses:
 *       201:
 *         description: Created
 */
router.route("/createCart").post(protect, createCart);

/**
 * @swagger
 * /api/carts/deleteCart:
 *   delete:
 *     tags: [Cart]
 *     operatorId: deleteCart
 *     description: Delete customer's cart
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not Found
 */
router.route("/deleteCart").delete(protect, deleteCart);

/**
 * @swagger
 * /api/carts/activeOrInactiveCart:
 *   put:
 *     tags: [Cart]
 *     operatorId: activeOrInactiveCart
 *     description: Active or inactive customer's cart
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 */
router.route("/activeOrInactiveCart").put(protect, activeOrInactiveCart);

/**
 * @swagger
 * /api/carts/getAllCartItems/{id}:
 *   get:
 *     tags: [Cart Item]
 *     operatorId: getAllCartItems
 *     description: Get all items in cart by ID
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Cart ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/getAllCartItems/:cartId").get(protect, getAllCartItems);

/**
 * @swagger
 * /api/carts/addItemToCart/{id}:
 *   post:
 *     tags: [Cart Item]
 *     operatorId: addItemToCart
 *     description: Add item to cart
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Cart ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               productId:
 *                 type: string
 *               productColorId:
 *                 type: string
 *               productQuantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Added
 *       400:
 *         description: Bad Request
 */
router.route("/addItemToCart/:cartId").post(protect, addItemToCart);

/**
 * @swagger
 * /api/carts/updateItemInCart/{id}:
 *   put:
 *     tags: [Cart Item]
 *     operatorId: updateItemInCart
 *     description: Update item in cart
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Cart ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               productId:
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
router.route("/updateItemInCart/:cartId").put(protect, updateItemInCart);

/**
 * @swagger
 * /api/carts/removeItemFromCart/{id}:
 *   put:
 *     tags: [Cart Item]
 *     operatorId: removeItemFromCart
 *     description: Remove item from cart
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Cart ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               productId:
 *                 type: string
 *               productColorId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Removed
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/removeItemFromCart/:cartId").put(protect, removeItemFromCart);

/**
 * @swagger
 * /api/carts/removeAllItemsFromCart/{id}:
 *   delete:
 *     tags: [Cart Item]
 *     operatorId: removeAllItemsFromCart
 *     description: Remove all items from cart
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Cart ID
 *     responses:
 *       200:
 *         description: Removed
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/removeAllItemsFromCart/:cartId").delete(protect, removeAllItemsFromCart);

module.exports = router;