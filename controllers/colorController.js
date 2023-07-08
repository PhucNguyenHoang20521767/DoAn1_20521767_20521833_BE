const mongoose = require("mongoose");
const Color = require("../models/color");
const ProductColor = require("../models/product/product_color");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllColors = async (req, res, next) => {
    let options = {};

    let total = Color.countDocuments(options);
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || parseInt(await total);
    let last_page = Math.ceil(parseInt(await total)/limit);
    if (last_page < 1 && total > 0) {
        last_page = 1
    }

    try {
        const colors = await Color.find(options);
        res.status(200).json({
            success: true,
            message: "List of colors fetched successfully",
            data: colors,
            total: (await total).toString(),
            page: (await page).toString(),
            last_page: (await last_page).toString()
        });
    } catch (error) {
        next(error);
    }
};

exports.getColorById = async (req, res, next) => {
    const { colorId } = req.params;

    if (!colorId || !mongoose.Types.ObjectId.isValid(colorId))
        return next(new ErrorResponse("Please provide valid color's ID", 400));
    
    try {
        const color = await Color.findById(colorId);

        if (!color)
            return next(new ErrorResponse("No color found", 404));

        res.status(200).json({
            success: true,
            data: color
        });
    } catch(error) {
        next(error);
    }
};

exports.createColor = async (req, res, next) => {
    const { colorName, colorHex } = req.body;

    try {
        const col = await Color.findOne({
            colorHex: colorHex
        });

        if (col)
            return next(new ErrorResponse("Color existed in database", 400));
        else {
            const color = await Color.create({
                colorName,
                colorHex
            });

            res.status(201).json({
                success: true,
                message: "Color created successfully",
                data: color
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.updateColor = async(req, res, next) => {
    const { colorId } = req.params;

    if (!colorId || !mongoose.Types.ObjectId.isValid(colorId))
        return next(new ErrorResponse("Please provide valid color's ID", 400));

    const { colorName, colorHex } = req.body;

    try {
        const col = await Color.findOne({
            _id: { $ne: colorId },
            colorHex: colorHex
        });

        if (col) {
            return next(new ErrorResponse("Color existed in database", 400));
        }
        else {
            const color = await Color.findByIdAndUpdate(colorId, {
                colorName,
                colorHex
            });
    
            if (color) {
                res.status(200).json({
                    success: true,
                    message: "Color updated successfully",
                    data: color
                });
            } else {
                return next(new ErrorResponse("Color not found", 404));
            }
        }
    } catch (error) {
        next(error);
    }
};

exports.deleteColor = async (req, res, next) => {
    const { colorId } = req.params;

    if (!colorId || !mongoose.Types.ObjectId.isValid(colorId))
        return next(new ErrorResponse("Please provide valid color's ID", 400));

    try {
        const colorsList = await ProductColor.find({
            colorId: colorId
        });

        if (colorsList.length > 0) {
            return next(new ErrorResponse("This color can't be deleted", 400));
        }
        else {
            const color = await Color.findByIdAndDelete(colorId);
    
            if (!color)
                return next(new ErrorResponse("No color found", 404));
    
            res.status(200).json({
                success: true,
                message: "Color deleted successfully",
                data: color
            });
        }
    } catch (error) {
        next(error);
    }
};