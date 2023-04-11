const mongoose = required("mongoose");
const Product = required("../models/product");
const ErrorResponse = require("../utils/errorResponse");

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