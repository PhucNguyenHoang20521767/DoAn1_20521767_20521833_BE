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
 *         - productQuantity
 *       properties:
 *         importId:
 *           type: string
 *         productId:
 *           type: string
 *         productQuantity:
 *           type: number
 */