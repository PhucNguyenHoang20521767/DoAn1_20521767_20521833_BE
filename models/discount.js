const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var discountSchema = new Schema(
    {
        discountName: {
            type: String,
            required: [true, "Please provide discount's name"],
			trim: true
        },
        discountDescription: {
            type: String,
			trim: true
        },
        discountThumbnail: {
            type: String,
            default: "",
            trim: true
        },
        discountPercent: {
            type: Number,
            required: [true, "Please provide discount's percent"],
			default: 0
        },
        discountStartDate: {
            type: Date,
            required: [true, "Please provide discount's start date"]
        },
        discountEndDate: {
            type: Date,
            required: [true, "Please provide discount's end date"]
        }
    },
    { timestamps: true }
);

const Discount = mongoose.model("Discount", discountSchema);
module.exports = Discount;

/**
 * @swagger
 * components:
 *   schemas:
 *     Discount:
 *       type: object
 *       required:
 *         - discountName
 *         - discountPercent
 *         - discountStartDate
 *         - discountEndDate
 *       properties:
 *         discountName:
 *           type: string
 *         discountDescription:
 *           type: string
 *         discountThumbnail:
 *           type: string
 *         discountPercent:
 *           type: number
 *         discountStartDate:
 *           type: string
 *         discountEndDate:
 *           type: string
 */