const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var colorSchema = new Schema(
    {
        colorName: {
            type: String,
            required: true,
            trim: true
        },
        colorHex: {
            type: String,
            required: true,
            trim: true
        }
    },
    { timestamps: true }
);

const Color = mongoose.model("Color", colorSchema);
module.exports = Color;

/**
 * @swagger
 * components:
 *   schemas:
 *     Color:
 *       type: object
 *       required:
 *         - colorName
 *         - colorHex
 *       properties:
 *         colorName:
 *           type: string
 *         colorHex:
 *           type: string
 */