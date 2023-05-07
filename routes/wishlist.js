const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getCustomerWishlist, addOrRemoveProductFromWishlist } = require("../controllers/wishlistController");

/**
 * @swagger
 * /api/wishlist/getCustomerWishlist:
 *   get:
 *     tags: [Wishlist]
 *     operatorId: getCustomerWishlist
 *     description: Get customer's wishlist
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getCustomerWishlist").get(protect, getCustomerWishlist);

/**
 * @swagger
 * /api/wishlist/addOrRemoveProductFromWishlist/{id}:
 *   put:
 *     tags: [Wishlist]
 *     operatorId: addOrRemoveProductFromWishlist
 *     description: Add or remove product from wishlist
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product ID
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/addOrRemoveProductFromWishlist/:productId").put(protect, addOrRemoveProductFromWishlist);

module.exports = router