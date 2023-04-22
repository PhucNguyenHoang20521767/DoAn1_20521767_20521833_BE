const mongoose = require("mongoose");
const Supplier = require("../models/supplier");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllSuppliers = async (req, res, next) => {
    let options = {};
    
    let total = Supplier.countDocuments(options);
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || parseInt(await total);
    let last_page = Math.ceil(parseInt(await total)/limit);
    if (last_page < 1 && total > 0) {
        last_page = 1
    }

    try {
        const suppliers = await Supplier.find(options);
        res.status(200).json({
            success: true,
            message: "List of suppliers fetched successfully",
            data: suppliers,
            total: (await total).toString(),
            page: (await page).toString(),
            last_page: (await last_page).toString()
        });
    } catch (error) {
        next(error);
    }
};

exports.getSupplierById = async (req, res, next) => {
    const { supplierId } = req.params;

    if (!supplierId || !mongoose.Types.ObjectId.isValid(supplierId))
        return next(new ErrorResponse("Please provide valid supplier's ID", 400));

    try {
        const supplier = await Supplier.findById(supplierId);

        if (!supplier)
            return next(new ErrorResponse("No supplier found", 404));
        
        res.status(200).json({
            success: true,
            data: supplier
        });
    } catch (error) {
        next(error);
    }
};

exports.createSupplier = async (req, res, next) => {
    const { supplierName, supplierCountry, supplierAddress } = req.body;

    try {
        const supplier = await Supplier.create({
            supplierName,
            supplierCountry,
            supplierAddress
        });

        res.status(201).json({
            success: true,
            message: "Supplier created successfully",
            data: supplier
        });
    } catch (error) {
        next(error);
    }
};

exports.updateSupplier = async (req, res, next) => {
    const { supplierId } = req.params;

    if (!supplierId || !mongoose.Types.ObjectId.isValid(supplierId))
        return next(new ErrorResponse("Please provide valid supplier's ID", 400));

    const { supplierName, supplierCountry, supplierAddress } = req.body;

    try {
        const supplier = await Supplier.findByIdAndUpdate(supplierId, { 
            supplierName,
            supplierCountry,
            supplierAddress
        });

        if (!supplier)
            return next(new ErrorResponse("No supplier found", 404));
        
        res.status(200).json({
            success: true,
            message: "Supplier updated successfully",
            data: supplier
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteSupplier = async (req, res, next) => {
    const { supplierId } = req.params;

    if (!supplierId || !mongoose.Types.ObjectId.isValid(supplierId))
        return next(new ErrorResponse("Please provide valid supplier's ID", 400));

    try {
        const supplier = await Supplier.findByIdAndDelete(supplierId);

        if (!supplier)
            return next(new ErrorResponse("No supplier found", 404));
        
        res.status(200).json({
            success: true,
            message: "Supplier deleted successfully",
            data: supplier
        });
    } catch (error) {
        next(error);
    }
};