const mongoose = require("mongoose");
const Import = require("../models/import/import");
const ImportDetail = require("../models/import/import_detail");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllImports = async (req, res, next) => {
    let options = {};

    let total = Import.countDocuments(options);
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || parseInt(await total);
    let last_page = Math.ceil(parseInt(await total)/limit);
    if (last_page < 1 && total > 0) {
        last_page = 1
    }

    try {
        const imports = await Import.find(options);
        res.status(200).json({
            success: true,
            message: "List of imports fetched successfully",
            data: imports,
            total: (await total).toString(),
            page: (await page).toString(),
            last_page: (await last_page).toString()
        });
    } catch (error) {
        next(error);
    }
};

exports.getImportById = async (req, res, next) => {
    const { importId } = req.params;

    if (!importId || !mongoose.Types.ObjectId.isValid(importId))
        return next(new ErrorResponse("Please provide valid import's ID", 400));

    try {
        const imp = await Import.findById(importId);

        if (!imp)
            return next(new ErrorResponse("No import found", 404));
        
        res.status(200).json({
            success: true,
            data: imp
        });
    } catch (error) {
        next(error);
    }
};

exports.createImport = async (req, res, next) => {
    const { staffId, supplierId, importDate } = req.body;

    try {
        const imp = await Import.create({
            staffId,
            supplierId,
            importDate
        });

        res.status(201).json({
            success: true,
            message: "Import created successfully",
            data: imp
        });
    } catch (error) {
        next(error);
    }
};

exports.updateImport = async (req, res, next) => {
    const { importId } = req.params;

    if (!importId || !mongoose.Types.ObjectId.isValid(importId))
        return next(new ErrorResponse("Please provide valid import's ID", 400));

    const { staffId, supplierId, importDate } = req.body;

    try {
        const imp = await Import.findByIdAndUpdate(importId, {
            staffId,
            supplierId,
            importDate
        });

        if (!imp)
            return next(new ErrorResponse("No import found", 404));
        
        res.status(200).json({
            success: true,
            message: "Import updated successfully",
            data: imp
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteImport = async (req, res, next) => {
    const { importId } = req.params;

    if (!importId || !mongoose.Types.ObjectId.isValid(importId))
        return next(new ErrorResponse("Please provide valid import's ID", 400));

    try {
        const imp = await Import.findByIdAndDelete(importId);

        if (!imp)
            return next(new ErrorResponse("No import found", 404));
        
        res.status(200).json({
            success: true,
            message: "Import deleted successfully",
            data: imp
        });
    } catch (error) {
        next(error);
    }
};

// Import Detail
exports.getAllImportDetails = async (req, res, next) => {
    let options = {};

    let total = ImportDetail.countDocuments(options);
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || parseInt(await total);
    let last_page = Math.ceil(parseInt(await total)/limit);
    if (last_page < 1 && total > 0) {
        last_page = 1
    }

    try {
        const importDetails = await ImportDetail.find(options);
        res.status(200).json({
            success: true,
            message: "List of import details fetched successfully",
            data: importDetails,
            total: (await total).toString(),
            page: (await page).toString(),
            last_page: (await last_page).toString()
        });
    } catch (error) {
        next(error);
    }
};

exports.getDetailsForImport = async (req, res, next) => {
    const { importId } = req.params;

    if (!importId || !mongoose.Types.ObjectId.isValid(importId)) {
        return next(new ErrorResponse("Please provide valid import's ID", 400));
    }

    try {
        const importDetails = await ImportDetail.find({ importId: importId });

        if (!importDetails)
            return next(new ErrorResponse("No import detail found", 404));

        res.status(200).json({
            success: true,
            message: "List of import details fetched successfully",
            data: importDetails
        });
    } catch (error) {
        next(error);
    }
};

exports.getImportDetailById = async (req, res, next) => {
    const { importDetailId } = req.params;

    if (!importDetailId || !mongoose.Types.ObjectId.isValid(importDetailId))
        return next(new ErrorResponse("Please provide valid import detail's ID", 400));

    try {
        const importDetail = await ImportDetail.findById(importDetailId);

        if (!importDetail)
            return next(new ErrorResponse("No import detail found", 404));
        
        res.status(200).json({
            success: true,
            data: importDetail
        });
    } catch (error) {
        next(error);
    }
};

exports.createImportDetail = async (req, res, next) => {
    const { importId, productId, productQuantity } = req.body;

    try {
        const importDetail = await ImportDetail.create({
            importId,
            productId,
            productQuantity
        });

        res.status(201).json({
            success: true,
            message: "Import detail created successfully",
            data: importDetail
        });
    } catch (error) {
        next(error);
    }
};

exports.updateImportDetail = async (req, res, next) => {
    const { importDetailId } = req.params;

    if (!importDetailId || !mongoose.Types.ObjectId.isValid(importDetailId))
        return next(new ErrorResponse("Please provide valid import detail's ID", 400));

    const { importId, productId, productQuantity } = req.body;

    try {
        const importDetail = await ImportDetail.findByIdAndUpdate(importDetailId, {
            importId,
            productId,
            productQuantity
        });

        if (!importDetail)
            return next(new ErrorResponse("No import detail found", 404));
        
        res.status(200).json({
            success: true,
            message: "Import detail updated successfully",
            data: importDetail
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteImportDetail = async (req, res, next) => {
    const { importDetailId } = req.params;

    if (!importDetailId || !mongoose.Types.ObjectId.isValid(importDetailId))
        return next(new ErrorResponse("Please provide valid import detail's ID", 400));

    try {
        const importDetail = await ImportDetail.findByIdAndDelete(importDetailId);

        if (!importDetail)
            return next(new ErrorResponse("No import detail found", 404));
        
        res.status(200).json({
            success: true,
            message: "Import detail deleted successfully",
            data: importDetail
        });
    } catch (error) {
        next(error);
    }
};