const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var paymentSchema = new Schema(
    {
        paymentType: {
            type: String,
            required: [true, "Please provide payment's type"],
            trim: true
        },
        paymentStatus: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - paymentType
 *       properties:
 *         paymentType:
 *           type: string
 *         paymentStatus:
 *           type: boolean
 */