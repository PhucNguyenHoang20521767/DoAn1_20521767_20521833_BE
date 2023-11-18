const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contentImageSchema = require("./content_image").schema;

var postContentSchema = new Schema(
    {
        partTitle: {
            type: String,
            required: [true, "Please provide part's title"],
            trim: true
        },
        partContent: {
            type: String,
            required: [true, "Please provide part's content"],
            trim: true
        },
        partImage: {
            type: [contentImageSchema],
            default: []
        }
    },
    { timestamps: true }
);

module.exports = postContentSchema;

const PostContent = mongoose.model("PostContent", postContentSchema);
module.exports = PostContent;

/**
 * @swagger
 * components:
 *   schemas:
 *     PostContent:
 *       type: object
 *       required:
 *         - partTitle
 *         - partContent
 *       properties:
 *         partTitle:
 *           type: string
 *         partContent:
 *           type: string
 *         partImage:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ContentImage'
 */