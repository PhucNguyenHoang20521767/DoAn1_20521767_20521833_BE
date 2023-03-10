const mongoose = require("mongoose");
const Category = require("../models/category");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllCategories = async (req, res, next) => {
    let options = {};

    if (req.query.s) {
        options = {
            ...options,
            $or: [
                {}
            ],
        }
    }

    let total = Category.countDocuments(options);
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || parseInt(await total);
    let last_page = Math.ceil(parseInt(await total)/limit);
    if (last_page < 1 && total > 0) {
        last_page = 1
    }

    try {
        const categories = await Category.find(options);
        res.status(200).json({
            success: true,
            message: "List of categories fetched successfully",
            data: categories,
            total: (await total).toString(),
            page: (await page).toString(),
            last_page: (await last_page).toString()
        });
    } catch (error) {
        next(error);
    }
};

exports.getCategoryById = async (req, res, next) => {
    const { categoryId } = req.params;

    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId))
        return next(new ErrorResponse("Please provide valid category's ID", 400));

    try {
        const category = await Category.findById(categoryId);

        if (!category)
            return next(new ErrorResponse("No category found", 404));
        
        res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {
        next(error);
    }
};

exports.createCategory = async (req, res, next) => {
    const { categoryName, categoryDescription } = req.body;

    try {
        const category = await Category.create({
            categoryName,
            categoryDescription
        });

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category
        });
    } catch (error) {
        next(error);
    }
};

exports.updateCategory = async (req, res, next) => {
    const { categoryId } = req.params;

    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId))
        return next(new ErrorResponse("Please provide valid category's ID", 400));

    const { categoryName, categoryDescription } = req.body;

    try {
        const category = await Category.findByIdAndUpdate(
            categoryId,
            { 
                categoryName,
                categoryDescription 
            },
            { new: true }
        );

        if (!category)
            return next(new ErrorResponse("No category found", 404));
        
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteCategory = async (req, res, next) => {
    const { categoryId } = req.params;

    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId))
        return next(new ErrorResponse("Please provide valid category's ID", 400));

    try {
        const category = await Category.findByIdAndDelete(categoryId);

        if (!category)
            return next(new ErrorResponse("No category found", 404));
        
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data: category
        });
    } catch (error) {
        next(error);
    }
};