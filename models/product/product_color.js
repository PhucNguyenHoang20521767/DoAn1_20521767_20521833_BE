const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var productColorSchema = new Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Please provide product's ID"],
			trim: true
        },
        productColorName: {
            type: String,
            required: true,
            trim: true
        },
        productColorCode: {
            type: String,
            required: true,
            trim: true
        }
    },
    { timestamps: true }
);

const ProductColor = mongoose.model("ProductColor", productColorSchema);
module.exports = ProductColor;

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductColor:
 *       type: object
 *       required:
 *         - productId
 *         - productColorName
 *         - productColorCode
 *       properties:
 *         productId:
 *           type: string
 *         productColorName:
 *           type: string
 *         productColorCode:
 *           type: string
 */