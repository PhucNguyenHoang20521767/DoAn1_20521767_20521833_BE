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
        importDate: {
            type: Date,
            required: [true, "Please provide import date"]
        },
        importStatus: {
            type: String,
            required: [true, "Please provide import's status"], // If Required
            enum: {
                values: [
                    "Chờ xác nhận",
                    "Đã xác nhận",
                    "Đã hủy"
                ],
                message: "{VALUE} is not supported as order's status"
            }
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
 *         - importDate
 *         - importStatus
 *       properties:
 *         staffId:
 *           type: string
 *         importDate:
 *           type: string
 *         importStatus
 *           type: string
 */