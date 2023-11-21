const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var blogPostSchema = new Schema(
    {
        blogPostTitle: {
            type: String,
            required: [true, "Please provide blog post's title"],
            trim: true
        },
        blogPostAuthor: {
            type: String,
            required: [true, "Please provide blog post's author name"],
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
            type: String,
            required: [true, "Please provide blog post's content"],
            trim: true
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
 *         - blogPostAuthor
 *         - blogPostTag
 *         - blogPostContent
 *       properties:
 *         blogPostTitle:
 *           type: string
 *         blogPostAuthor:
 *           type: string
 *         blogPostTag:
 *           type: string
 *         blogPostDescription:
 *           type: string
 *         blogPostThumbnail:
 *           type: string
 *         blogPostContent:
 *           type: string
 *         isHidden:
 *           type: boolean
 */

// const postContentSchema = require("./post_content").schema;
//
// blogPostContent: {
//     type: [postContentSchema],
//     required: [true, "Please provide blog post's content"],
//     default: []
// }