const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var feedbackImageSchema = new Schema(
    {
        feedbackId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Feedback",
            required: [true, "Please provide feedback's ID"],
			trim: true
        },
        feedbackImage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attachment",
            required: [true, "Please provide feedback's image"],
			trim: true
        }
    },
    { timestamps: true }
);

const FeedbackImage = mongoose.model("FeedbackImage", feedbackImageSchema);
module.exports = FeedbackImage;

/**
 * @swagger
 * components:
 *   schemas:
 *     FeedbackImage:
 *       type: object
 *       required:
 *         - feedbackId
 *         - feedbackImage
 *       properties:
 *         feedbackId:
 *           type: string
 *         feedbackImage:
 *           type: string
 */