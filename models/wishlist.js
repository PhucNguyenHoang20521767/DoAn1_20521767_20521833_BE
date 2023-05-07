const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var wishlistSchema = new Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Please provide product's ID"],
			trim: true
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: [true, "Please provide customer's ID"],
            trim: true
        }
    },
    { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;

/**
 * @swagger
 * components:
 *   schemas:
 *     Wishlist:
 *       type: object
 *       required:
 *         - productId
 *         - customerId
 *       properties:
 *         productId:
 *           type: string
 *         customerId:
 *           type: string
 */