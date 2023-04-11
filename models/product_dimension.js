const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var productDimensionSchema = new Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Please provide product's ID"],
			trim: true
        },
        productLength: {
            type: Number,
            required: true,
            trim: true
        },
        productWidth: {
            type: Number,
            required: true,
            trim: true
        },
        productHeight: {
            type: Number,
            required: true,
            trim: true
        },
        productWeight: {
            type: Number,
            required: true,
            trim: true
        }
    },
    { timestamps: true }
);

const ProductDimension = mongoose.model("ProductDimension", productDimensionSchema);
module.exports = ProductDimension;

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductColor:
 *       type: object
 *       required:
 *         - productId
 *         - productLength
 *         - productWidth
 *         - productHeight
 *         - productWeight
 *       properties:
 *         productId:
 *           type: string
 *         productLength:
 *           type: number
 *         productWidth:
 *           type: number
 *         productHeight:
 *           type: number
 *         productWeight:
 *           type: number
 */