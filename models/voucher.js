const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var voucherSchema = new Schema(
    {
        voucherType: {
            type: String,
            required: [true, "Please provide voucher's type"],
            enum: {
                values: [
                    "PERCENT",
                    "MONEY"
                ],
                message: "{VALUE} is not supported as voucher's type"
            }
        },
        voucherValue: {
            type: Number,
            required: [true, "Please provide voucher's value"],
            default: 0
        },
        minOrderPrice: {
            type: Number,
            required: [true, "Please provide min order price"],
            default: 0
        },
        maxDiscountPrice: {
            type: Number,
            required: [true, "Please provide max discount price"],
            default: 0
        },
        voucherEndDate: {
            type: Date,
            required: [true, "Please provide voucher's end date"]
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

const Voucher = mongoose.model("Voucher", voucherSchema);
module.exports = Voucher;

/**
 * @swagger
 * components:
 *   schemas:
 *     Voucher:
 *       type: object
 *       required:
 *         - voucherType
 *         - voucherValue
 *         - minOrderPrice
 *         - maxDiscountPrice
 *         - voucherEndDate
 *       properties:
 *         voucherType:
 *           type: string
 *         voucherValue:
 *           type: number
 *         minOrderPrice:
 *           type: number
 *         maxDiscountPrice:
 *           type: number
 *         voucherEndDate:
 *           type: string
 *         isActive:
 *           type: boolean
 */