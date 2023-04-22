const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var cartItemSchema = new Schema(
    {
        cartId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart",
            required: [true, "Please provide cart's ID"],
            trim: true
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Please provide product's ID"],
			trim: true
        },
        productQuantity: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);
module.exports = CartItem;

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       required:
 *         - cartId
 *         - productId
 *       properties:
 *         cartId:
 *           type: string
 *         productId:
 *           type: string
 *         productQuantity:
 *           type: number
 */