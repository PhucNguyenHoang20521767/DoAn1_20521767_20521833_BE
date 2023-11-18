const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postContentSchema = require("./post_content").schema;

var blogPostSchema = new Schema(
    {
        blogPostTitle: {
            type: String,
            required: [true, "Please provide blog post's title"],
            trim: true
        },
        blogPostTag: {
            type: String,
            required: [true, "Please provide blog post type"],
            trim: true
        },
        blogPostDescription: {
            type: String,
            default: "",
            trim: true
        },
        blogPostThumbnail: {
            type: String,
            default: "",
            trim: true
        },
        blogPostContent: {
            type: [postContentSchema],
            required: [true, "Please provide blog post's content"],
            default: []
        },
        isHidden: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const BlogPost = mongoose.model("BlogPost", blogPostSchema);
module.exports = BlogPost;

/**
 * @swagger
 * components:
 *   schemas:
 *     BlogPost:
 *       type: object
 *       required:
 *         - blogPostTitle
 *         - blogPostTag
 *         - blogPostContent
 *       properties:
 *         blogPostTitle:
 *           type: string
 *         blogPostTag:
 *           type: string
 *         blogPostDescription:
 *           type: string
 *         blogPostThumbnail:
 *           type: string
 *         blogPostContent:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PostContent'
 *         isHidden:
 *           type: boolean
 */