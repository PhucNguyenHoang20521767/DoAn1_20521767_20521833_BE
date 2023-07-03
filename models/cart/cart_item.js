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
        productColorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductColor",
            required: [true, "Please provide product color's ID"],
			trim: true
        },
        productQuantity: {
            type: Number,
            required: [true, "Please provide product's quantity"]
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
 *         - productColorId
 *         - productQuantity
 *       properties:
 *         cartId:
 *           type: string
 *         productId:
 *           type: string
 *         productColorId:
 *           type: string
 *         productQuantity:
 *           type: number
 */