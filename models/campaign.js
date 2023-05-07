const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var campaignSchema = new Schema(
    {
        campaignName: {
            type: String,
            required: [true, "Please provide campaign's name"],
			trim: true
        },
        campaignImage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attachment",
            default: null,
			trim: true
        },
        campaignStartDate: {
            type: Date,
            required: [true, "Please provide campaign's start date"]
        },
        campaignEndDate: {
            type: Date,
            required: [true, "Please provide campaign's end date"]
        }
    },
    { timestamps: true }
);

const Campaign = mongoose.model("Campaign", campaignSchema);
module.exports = Campaign;

/**
 * @swagger
 * components:
 *   schemas:
 *     Campaign:
 *       type: object
 *       required:
 *         - campaignName
 *         - campaignStartDate
 *         - campaignEndDate
 *       properties:
 *         campaignName:
 *           type: string
 *         campaignImage:
 *           type: string
 *         campaignStartDate:
 *           type: string
 *         campaignEndDate:
 *           type: string
 */