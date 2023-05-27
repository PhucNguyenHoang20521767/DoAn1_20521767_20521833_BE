const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var importDetailSchema = new Schema(
    {
        importId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Import",
            required: [true, "Please provide import's ID"],
            trim: true
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Please provide product's ID"],
            trim: true
        },
        supplierId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
            required: [true, "Please provide supplier's ID"],
            trim: true
        },
        productColorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductColor",
            required: [true, "Please provide product color's ID"],
			trim: true
        },
        productQuantity: {
            type: Number,
            required: [true, "Please provide product's quantity"]
        }
    },
    { timestamps: true }
);

const ImportDetail = mongoose.model("ImportDetail", importDetailSchema);
module.exports = ImportDetail;

/**
 * @swagger
 * components:
 *   schemas:
 *     ImportDetail:
 *       type: object
 *       required:
 *         - importId
 *         - productId
 *         - supplierId
 *         - productColorId
 *         - productQuantity
 *       properties:
 *         importId:
 *           type: string
 *         productId:
 *           type: string
 *         supplierId:
 *           type: string
 *         productColorId:
 *           type: string
 *         productQuantity:
 *           type: number
 */