const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var discountSchema = new Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Please provide product's ID"],
			trim: true
        },
        campaignId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign",
            required: [true, "Please provide campaign's ID"],
			trim: true
        },
        discountName: {
            type: String,
            required: [true, "Please provide discount's name"],
			trim: true
        },
        discountDescription: {
            type: String,
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
 *         - productId
 *         - campaignId
 *         - discountName
 *         - discountPercent
 *         - discountStartDate
 *         - discountEndDate
 *       properties:
 *         productId:
 *           type: string
 *         campaignId:
 *           type: string
 *         discountName:
 *           type: string
 *         discountDescription:
 *           type: string
 *         discountStartDate:
 *           type: string
 *         discountEndDate:
 *           type: string
 */