const mongoose = require("mongoose");
const Discount = require("../models/discount");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllDiscounts = async (req, res, next) => {
    let options = {};

    let total = Discount.countDocuments(options);
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || parseInt(await total);
    let last_page = Math.ceil(parseInt(await total)/limit);
    if (last_page < 1 && total > 0) {
        last_page = 1
    }

    try {
        const discounts = await Discount.find(options);
        res.status(200).json({
            success: true,
            message: "List of discounts fetched successfully",
            data: discounts,
            total: (await total).toString(),
            page: (await page).toString(),
            last_page: (await last_page).toString()
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

exports.createDiscount = async (req, res, next) => {
    const { productId, campaignId, discountName, discountDescription, discountPercent, discountStartDate, discountEndDate } = req.body;

    try {
        const discount = await Discount.create({
            productId,
            campaignId,
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

exports.updateDiscount = async (req, res, next) => {
    const { discountId } = req.params;

    if (!discountId || !mongoose.Types.ObjectId.isValid(discountId))
        return next(new ErrorResponse("Please provide valid discount's ID", 400));

    const { productId, campaignId, discountName, discountDescription, discountPercent, discountStartDate, discountEndDate } = req.body;

    try {
        const discount = await Discount.findByIdAndUpdate(discountId, {
            productId,
            campaignId,
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