const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var categorySchema = new Schema(
    {
        categoryName: {
            type: String,
            required: [true, "Please provide category's name."],
            trim: true
        },
        categoryDescription: {
            type: String,
            required: [true, "Please provide category's description."],
            trim: true
        }
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - categoryName
 *       properties:
 *         categoryName:
 *           type: string
 *         categoryDescription:
 *           type: string
*/