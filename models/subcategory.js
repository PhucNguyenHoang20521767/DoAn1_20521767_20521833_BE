const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var subcategorySchema = new Schema(
    {
        subcategoryName: {
            type: String,
            required: [true, "Please provide subcategory's name"],
            trim: true
        }
    },
    { timestamps: true }
);

const Subcategory = mongoose.model("Subcategory", subcategorySchema);
module.exports = Subcategory;

/**
 * @swagger
 * components:
 *   schemas:
 *     Subcategory:
 *       type: object
 *       required:
 *         - subcategoryName
 *       properties:
 *         subcategoryName:
 *           type: string
 */