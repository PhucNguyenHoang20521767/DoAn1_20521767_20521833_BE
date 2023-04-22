const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var cartSchema = new Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: [true, "Please provide customer's ID"],
            trim: true
        },
        cartStatus: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - customerId
 *       properties:
 *         customerId:
 *           type: string
 *         cartStatus:
 *           type: boolean
 */