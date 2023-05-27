const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var productImageSchema = new Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Please provide product's ID"],
			trim: true
        },
        productColorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductColor",
            required: [true, "Please provide product color's ID"],
			trim: true
        },
        productImage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attachment",
            required: [true, "Please provide product's image"],
			trim: true
        }
    },
    { timestamps: true }
);

const ProductImage = mongoose.model("ProductImage", productImageSchema);
module.exports = ProductImage;

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductImage:
 *       type: object
 *       required:
 *         - productId
 *         - productColorId
 *         - productImage
 *       properties:
 *         productId:
 *           type: string
 *         productColorId:
 *           type: string
 *         productImage:
 *           type: string
 */