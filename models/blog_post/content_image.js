// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
//
// var contentImageSchema = new Schema(
//     {
//         contentImage: {
//             type: String,
//             required: [true, "Please provide content image"],
//             trim: true
//         },
//         contentImageDescription: {
//             type: String,
//             default: "",
//             trim: true
//         }
//     },
//     { timestamps: true }
// );
//
// module.exports = contentImageSchema;
//
// const ContentImage = mongoose.model("ContentImage", contentImageSchema);
// module.exports = ContentImage;
//
// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     ContentImage:
//  *       type: object
//  *       required:
//  *         - contentImage
//  *       properties:
//  *         contentImage:
//  *           type: string
//  *         contentImageDescription:
//  *           type: string
//  */