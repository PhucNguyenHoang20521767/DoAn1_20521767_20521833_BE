const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var feedbackSchema = new Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: [true, "Please provide customer's ID"],
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
            required: [true, "Please provide product's ID"],
			trim: true
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: [true, "Please provide order's ID"],
			trim: true
        },
        feedbackRating: {
            type: Number,
            min: [1, "Feedback rating must be in 1 to 5"],
            max: [5, "Feedback rating must be in 1 to 5"],
            required: [true, "Please provide feedback's rating"]
        },
        feedbackTitle: {
            type: String,
            trim: true
        },
        feedbackContent: {
            type: String,
            required: [true, "Please provide feedback's content"],
            trim: true
        }
    },
    { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;

/**
 * @swagger
 * components:
 *   schemas:
 *     Feedback:
 *       type: object
 *       required:
 *         - customerId
 *         - productId
 *         - productColorId
 *         - orderId
 *         - feedbackRating
 *         - feedbackContent
 *       properties:
 *         customerId:
 *           type: string
 *         productId:
 *           type: string
 *         productColorId:
 *           type: string
 *         orderId:
 *           type: string
 *         feedbackRating:
 *           type: number
 *         feedbackTitle:
 *           type: string
 *         feedbackContent:
 *           type: string
 */