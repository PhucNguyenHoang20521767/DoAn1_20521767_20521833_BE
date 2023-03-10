// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// var productSchema = new Schema(
//     { 
//         productName: {
//             type: String,
//             required: [true, "Please provide product's name."],
//             trim: true
//         },
//         productDescription: {
//             type: String,
//             required: [true, "Please provide product's description."],
//             trim: true
//         },
//         productPrice: {
//             type: Number,
//             required: [true, "Please provide product's price."]
//         },
//         productCategory: {
//             type: Schema.Types.ObjectId,
//             ref: "Category",
//             required: [true, "Please provide product's category."]
//         },
//         productSold: {
//             type: Number,
//             default: 0
//         },
//         productStatus: {
//             type: Boolean,
// 			required: true,
// 			default: true
//         },
//         productSupplier: {
//             type: Schema.Types.ObjectId,
//             ref: "Supplier",
//             default: null
//         }
//     },
//     { timestamps: true }
// );

// const Product = mongoose.model("Product", productSchema);
// module.exports = Product;

// /**
//  * @swagger
//  * components:
//  *  schemas:
//  *   Product:
//  *    type: object
//  *    required:
//  *      - productName
//  *      - productDescription
//  *      - productPrice
//  *      - productCategory
//  *    properties:
//  *      productName:
//  *        type: string
//  *      productDescription:
//  *        type: string
//  *      productPrice:
//  *        type: number
//  *      productCategory:
//  *        type: string
//  *        description: Category ID
//  *      productSold:
//  *        type: number
//  *      productStatus:
//  *        type: boolean
//  *      productSupplier:
//  *        type: string
//  *        description: Supplier ID
// */