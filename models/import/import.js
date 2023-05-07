const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var importSchema = new Schema(
    {
        staffId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Staff",
            required: [true, "Please provide staff's ID"],
            trim: true
        },
        supplierId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
            required: [true, "Please provide supplier's ID"],
            trim: true
        },
        importDate: {
            type: Date,
            required: [true, "Please provide import date"]
        }
    },
    { timestamps: true }
);

const Import = mongoose.model("Import", importSchema);
module.exports = Import;

/**
 * @swagger
 * components:
 *   schemas:
 *     Import:
 *       type: object
 *       required:
 *         - staffId
 *         - supplierId
 *         - importDate
 *       properties:
 *         staffId:
 *           type: string
 *         supplierId:
 *           type: string
 *         importDate:
 *           type: string
 */