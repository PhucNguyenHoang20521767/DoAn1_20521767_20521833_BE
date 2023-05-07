const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var supplierSchema = new Schema(
    {
        supplierName: {
            type: String,
            required: [true, "Please provide supplier's name"],
			trim: true
        },
        supplierCountry: {
            type: String,
            required: [true, "Please provide supplier's country"],
			trim: true
        },
        supplierAddress: {
            type: String,
            required: [true, "Please provide supplier's address"],
			trim: true
        }
    },
    { timestamps: true }
);

const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;

/**
 * @swagger
 * components:
 *   schemas:
 *     Supplier:
 *       type: object
 *       required:
 *         - supplierName
 *         - supplierCountry
 *         - supplierAddress
 *       properties:
 *         supplierName:
 *           type: string
 *         supplierCountry:
 *           type: string
 *         supplierAddress:
 *           type: string
 */