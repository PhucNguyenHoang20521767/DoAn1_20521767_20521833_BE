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
        colorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Color",
            required: [true, "Please provide color's ID"],
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
 *         - colorId
 *       properties:
 *         productId:
 *           type: string
 *         colorId:
 *           type: string
 */