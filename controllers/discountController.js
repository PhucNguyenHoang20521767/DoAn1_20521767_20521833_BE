const mongoose = require("mongoose");
const Discount = require("../models/discount");
const Product = require("../models/product/product");
const ErrorResponse = require("../utils/errorResponse");

const firebaseStorage = require("../config/firebase");
const { ref, getDownloadURL } = require("firebase/storage");

exports.getAllDiscounts = async (req, res, next) => {
    let options = {};

    if (req.search) {
        options = {
            ...options,
            $or: [
                { discountName: new RegExp(req.search.toString(), "i") }
            ],
        }
    }

    let total = Discount.countDocuments(options);
    let limit = req.pagination.limit === "TOTAL" ? parseInt(await total) : req.pagination.limit;
    let skip = (req.pagination.page - 1) * limit;
    let lastPage = Math.ceil(parseInt(await total) / req.pagination.limit);
    
    if (lastPage < 1 && total > 0) {
        lastPage = 1
    }

    try {
        const discounts = await Discount
            .find(options)
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);

        res.status(200).json({
            success: true,
            message: "List of discounts fetched successfully",
            data: discounts,
            total: (await total).toString(),
            page: (await req.pagination.page).toString(),
            lastPage: (await lastPage).toString()
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllValidDiscounts = async (req, res, next) => {
    let options = {
        discountStartDate: { $lte: new Date().toISOString() },
        discountEndDate: { $gte: new Date().toISOString() }
    };

    if (req.search) {
        options = {
            ...options,
            $and: [
                { discountName: new RegExp(req.search.toString(), "i") }
            ],
        }
    }

    let total = Discount.countDocuments(options);
    let limit = req.pagination.limit === "TOTAL" ? parseInt(await total) : req.pagination.limit;
    let skip = (req.pagination.page - 1) * limit;
    let lastPage = Math.ceil(parseInt(await total) / req.pagination.limit);
    
    if (lastPage < 1 && total > 0) {
        lastPage = 1
    }

    try {
        const discounts = await Discount
            .find(options)
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);

        res.status(200).json({
            success: true,
            message: "List of valid discounts fetched successfully",
            data: discounts,
            total: (await total).toString(),
            page: (await req.pagination.page).toString(),
            lastPage: (await lastPage).toString()
        });
    } catch (error) {
        next(error);
    }
};

exports.getDiscountById = async (req, res, next) => {
    const { discountId } = req.params;

    if (!discountId || !mongoose.Types.ObjectId.isValid(discountId))
        return next(new ErrorResponse("Please provide valid discount's ID", 400));

    try {
        const discount = await Discount.findById(discountId);

        if (!discount)
            return next(new ErrorResponse("No discount found", 404));
        
        res.status(200).json({
            success: true,
            data: discount
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllProductsForDiscount = async (req, res, next) => {
    const { discountId } = req.params;

    if (!discountId || !mongoose.Types.ObjectId.isValid(discountId))
        return next(new ErrorResponse("Please provide valid discount's ID", 400));

    try {
        const productsList = await Product.find({
            productDiscountId: discountId
        });

        if (!productsList)
            return next(new ErrorResponse("No product found", 404));
        
        res.status(200).json({
            success: true,
            message: "Products list for discount",
            data: productsList
        });
    } catch (error) {
        next(error);
    }
};

exports.resetDiscount = async (req, res, next) => {
    const { discountId } = req.params;

    if (!discountId || !mongoose.Types.ObjectId.isValid(discountId))
        return next(new ErrorResponse("Please provide valid discount's ID", 400));

    try {
        const productsList = await Product.find({
            productDiscountId: discountId
        });

        if (!productsList)
            return next(new ErrorResponse("No product found", 404));


        await Promise.all(productsList.map(async (product) => {
            await product.updateOne({
                productDiscountId: null
            })
        }));
        
        res.status(200).json({
            success: true,
            message: "Successful"
        });
    } catch (error) {
        next(error);
    }
};

exports.applyDiscountForProduct = async (req, res, next) => {
    const { productId, discountId } = req.params;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId))
        return next(new ErrorResponse("Please provide valid product's ID", 400));

    if (!discountId || !mongoose.Types.ObjectId.isValid(discountId))
        return next(new ErrorResponse("Please provide valid discount's ID", 400));

    try {
        const product = await Product.findById(productId);

        if (!product)
            return next(new ErrorResponse("No product found", 404));

        await product.updateOne({
            productDiscountId: discountId
        })
        
        res.status(200).json({
            success: true,
            message: "Apply discount successfully",
            data: product
        });
    } catch (error) {
        next(error);
    }
};

exports.createDiscount = async (req, res, next) => {
    const { discountName, discountDescription, discountPercent, discountStartDate, discountEndDate } = req.body;

    try {
        const discount = await Discount.create({
            discountName,
            discountDescription,
            discountPercent,
            discountStartDate,
            discountEndDate
        });

        res.status(201).json({
            success: true,
            message: "Discount created successfully",
            data: discount
        });
    } catch (error) {
        next(error);
    }
};

exports.saveDiscountThumbnail = async (req, res, next) => {
    const { discountId } = req.params;

    if (!discountId || !mongoose.Types.ObjectId.isValid(discountId)) {
        return next(new ErrorResponse("Please provide valid discount's ID", 400));
    }

    try {
        const discount = await Discount.findById(discountId);

        if (!discount)
            return next(new ErrorResponse("No discount found", 404));

        const thumbnailURL = await getDownloadURL(ref(firebaseStorage, `attachments/${req.thumbnailOriginalName}`));

        await discount.updateOne({
            discountThumbnail: thumbnailURL
        });

        await discount.save();

        res.status(200).json({
            success: true,
            message: "Discount's thumbnail saved successfully"
        });
    } catch (error) {
        next(error);
    }
};

exports.updateDiscount = async (req, res, next) => {
    const { discountId } = req.params;

    if (!discountId || !mongoose.Types.ObjectId.isValid(discountId))
        return next(new ErrorResponse("Please provide valid discount's ID", 400));

    const { discountName, discountDescription, discountPercent, discountStartDate, discountEndDate } = req.body;

    try {
        const discount = await Discount.findByIdAndUpdate(discountId, {
            discountName,
            discountDescription,
            discountPercent,
            discountStartDate,
            discountEndDate  
        });

        if (!discount)
            return next(new ErrorResponse("No discount found", 404));
        
        res.status(200).json({
            success: true,
            message: "Discount updated successfully",
            data: discount
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteDiscount = async (req, res, next) => {
    const { discountId } = req.params;

    if (!discountId || !mongoose.Types.ObjectId.isValid(discountId))
        return next(new ErrorResponse("Please provide valid discount's ID", 400));

    try {
        const discount = await Discount.findByIdAndDelete(discountId);

        if (!discount)
            return next(new ErrorResponse("No discount found", 404));
        
        res.status(200).json({
            success: true,
            message: "Discount deleted successfully",
            data: discount
        });
    } catch (error) {
        next(error);
    }
};