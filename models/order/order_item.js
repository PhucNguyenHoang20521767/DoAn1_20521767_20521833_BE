const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var orderItemSchema = new Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: [true, "Please provide order's ID"],
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
        },
        productPrice: {
            type: Number,
            required: [true, "Please provide product's price."]
        },
        productSalePrice: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

const OrderItem = mongoose.model("OrderItem", orderItemSchema);
module.exports = OrderItem;

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       required:
 *         - orderId
 *         - productId
 *         - productColorId
 *         - productQuantity
 *         - productPrice
 *       properties:
 *         orderId:
 *           type: string
 *         productId:
 *           type: string
 *         productColorId:
 *           type: string
 *         productQuantity:
 *           type: number
 *         productPrice:
 *           type: number
 *         productSalePrice:
 *           type: number
 */