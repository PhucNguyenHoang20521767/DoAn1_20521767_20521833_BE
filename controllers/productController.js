const mongoose = require("mongoose");
const Product = require("../models/product");
const Attachment = require("../models/attachment");
const ProductImage = require("../models/product_image");
const ErrorResponse = require("../utils/errorResponse");

const firebaseStorage = require("../config/firebase");
const { ref, deleteObject } = require("firebase/storage");

// CRUD Product
exports.getAllProducts = async (req, res, next) => {
    let options = {};

    let total = Product.countDocuments(options);
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || parseInt(await total);
    let last_page = Math.ceil(parseInt(await total)/limit);
    if (last_page < 1 && total > 0) {
        last_page = 1
    }

    try {
        const products = await Product.find(options);
        res.status(200).json({
            success: true,
            message: "List of products fetched successfully",
            data: products,
            total: (await total).toString(),
            page: (await page).toString(),
            last_page: (await last_page).toString()
        });
    } catch (error) {
        next(error);
    }
};

exports.getProductById = async(req, res, next) => {
    const { productId } = req.params;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId))
        return next(new ErrorResponse("Please provide valid product's ID", 400));
    
    try {
        const product = await Product.findById(productId);

        if (!product)
            return next(new ErrorResponse("No product found", 404));

        res.status(200).json({
            success: true,
            data: product
        });
    } catch(error) {
        next(error);
    }
};

exports.createProduct = async (req, res, next) => {
    const { productName, productDescription, productPrice, productCategoryId, productSubcategoryId, productQuantity, productSupplierId } = req.body;

    try {
        const product = await Product.create({
            productName,
            productDescription,
            productPrice,
            productCategoryId,
            productSubcategoryId,
            productQuantity,
            productSupplierId
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });
    } catch (error) {
        next(error);
    }
};

exports.updateProduct = async(req, res, next) => {
    const { productId } = req.params;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId))
        return next(new ErrorResponse("Please provide valid product's ID", 400));

    const { productName, productDescription, productPrice, productCategoryId, productSubcategoryId, productQuantity, productSupplierId } = req.body;

    try {
        const product = await Product.findByIdAndUpdate(productId, {
            productName,
            productDescription,
            productPrice,
            productCategoryId,
            productSubcategoryId,
            productQuantity,
            productSupplierId
        });

        if (product) {
            res.status(200).json({
                success: true,
                message: "Product updated successfully",
                data: product
            });
        } else {
            return next(new ErrorResponse("Product not found", 404));
        }
    } catch (error) {
        next(error);
    }
};

exports.deleteProduct = async (req, res, next) => {
    const { productId } = req.params;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId))
        return next(new ErrorResponse("Please provide valid product's ID", 400));

    try {
        const product = await Product.findByIdAndDelete(productId);

        if (!product)
            return next(new ErrorResponse("No product found", 404));

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: product
        });
    } catch (error) {
        next(error);
    }
};

exports.activeOrInactiveProduct = async(req, res, next) => {
    const { productId } = req.params;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId))
        return next(new ErrorResponse("Please provide valid product's ID", 400));

    try {
        const product = await Product.findById(productId);

        if (!product)
            return next(new ErrorResponse("No product found", 404));

        await product.updateOne({
            productStatus: !product.productStatus
        });
        await product.save();

        res.status(200).json({
            success: true,
            message: `Product ${product.productStatus ? "deactivated" : "activated"} successfully`
        });
    } catch (error) {
        next(error);
    }
};

// Product Image
exports.getAllProductImages = async (req, res, next) => {
    const { productId } = req.params;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorResponse("Please provide valid product's ID", 400));
    }

    try {
        const prodImgs = await ProductImage.find({
            productId: productId,
        }).select("-productId");

        res.status(200).json({
            success: true,
            message: "List of product images fetched successfully",
            data: prodImgs
        });
    } catch (error) {
        next(error);
    }
};

exports.saveProductImage = async (req, res, next) => {
    const { productId } = req.params;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorResponse("Please provide valid product's ID", 400));
    }

    let attachmentsList = req.files
		? req.files.map((file) => {
				return {
					attachmentMimeType: file.mimetype,
					attachmentName: file.originalname,
					attachmentSize: file.size,
				};
		  })
		: [];

    if (!attachmentsList.length)
		return next(new ErrorResponse("No attachments added", 404));

    try {
        const attachment = await Attachment.insertMany(attachmentsList);

        await ProductImage.insertMany(
            Array.from(attachment, (att) => {
                return {
                    productId: productId,
                    productImage: att._id.toString()
                };
            })
        );

        res.status(201).json({
            success: true,
            message: "Product image added successfully"
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteProductImage = async (req, res, next) => {
    const { productImageId } = req.params;

    if (!productImageId || !mongoose.Types.ObjectId.isValid(productImageId)) {
        return next(new ErrorResponse("Please provide valid product image's ID", 400));
    }

    try {
        const prodImg = await ProductImage.findByIdAndDelete(productImageId);
        const attachment = await Attachment.findByIdAndDelete(prodImg.productImage);

        await deleteObject(ref(firebaseStorage, `attachments/${attachment.attachmentName}`));

        res.status(200).json({
            success: true,
            message: "Product image deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};