// const mongoose = require("mongoose");
// const Product = require("../models/product");
// const ErrorResponse = require("../utils/errorResponse");

// exports.getAllProducts = async (req, res, next) => {
//     const { productCategory, productStatus, productSupplier } = req.query;

//     try {
//         res.status(200).json({
//             success: true,
//             message: "Product list fetched successfully",
//             ...(await Product.paginate(
//                 {
//                     ...(req.search && {
//                         $or: [
//                             ...queryObjectBuilder(
//                                 req.search,
//                                 [
//                                     "productName",
//                                     "productDescription",
//                                     "productPrice",
//                                     "productCategory",
//                                     "productSold",
//                                     "productStatus",
//                                     "productSupplier"
//                                 ],
//                                 true
//                             ),
//                         ],
//                     }),
//                     ...fieldsQuery({
//                         productCategory,
//                         productStatus,
//                         productSupplier
//                     }),
//                 },
//                 {
//                     ...req.pagination,
//                     populate: [
//                         {

//                         }
//                     ],
//                     sort: "-createdAt",
//                     select:
//                         " ",
//                     customLabels: {
//                         docs: "data",
//                         totalDocs: "total",
//                     },
//                 }
//             )),
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// exports.createProduct = async (req, res, next) => {
//     const { productName, productDescription, productPrice, productCategory, productSold, productStatus, productSupplier } = req.body;

//     try {
        
//         const product = await Product.create({
//             productName,
//             productDescription,
//             productPrice,
//             productCategory,
//             productSold,
//             productStatus,
//             productSupplier
//         });

//         res.status(201).json({
//             success: true,
//             message: "Product created successfully",
//             data: product
//         });

//     } catch (error) {
//         next(error);
//     }
// };