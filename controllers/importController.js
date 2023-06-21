const mongoose = require("mongoose");
const Import = require("../models/import/import");
const ImportDetail = require("../models/import/import_detail");
const Product = require("../models/product/product");
const ProductColor = require("../models/product/product_color");

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
    const { staffId, importDate } = req.body;

    try {
        const imp = await Import.create({
            staffId,
            importDate,
            importStatus: "Chờ xác nhận"
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

    const { staffId, importDate } = req.body;

    try {
        const imp = await Import.findByIdAndUpdate(importId, {
            staffId,
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

exports.confirmImport = async (req, res, next) => {
    const { importId } = req.params;

    if (!importId || !mongoose.Types.ObjectId.isValid(importId))
        return next(new ErrorResponse("Please provide valid import's ID", 400));

    try {
        const imp = await Import.findByIdAndUpdate(importId, {
            importStatus: "Đã xác nhận"
        });

        if (!imp)
            return next(new ErrorResponse("No import found", 404));

        const impDetails = await ImportDetail.find({
            importId: importId
        });

        const productQuantityMap = new Map();
        const productQuantityMapByColor = new Map();

        // Aggregate the quantities for the same product
        impDetails.forEach((item) => {
            const productId = item.productId.toString();
            const productColorId = item.productColorId.toString();
            const productQuantity = item.productQuantity;

            if (productQuantityMap.has(productId)) {
                productQuantityMap.set(productId, productQuantityMap.get(productId) + productQuantity);
            } else {
                productQuantityMap.set(productId, productQuantity);
            }

            if (productQuantityMapByColor.has(productColorId)) {
                productQuantityMapByColor.set(productColorId, productQuantityMapByColor.get(productColorId) + productQuantity);
            } else {
                productQuantityMapByColor.set(productColorId, productQuantity);
            }
        });

        const updateProductPromises = Array.from(productQuantityMap.entries()).map(async ([productId, productQuantity]) => {
            let product = await Product.findOne({
                _id: productId,
                productStatus: true
            });

            if (!product) throw new ErrorResponse("No product found", 404);

            await product.updateProductQuantity(productQuantity);
        });
        await Promise.all(updateProductPromises);

        const updateProductByColorPromises = Array.from(productQuantityMapByColor.entries()).map(async ([productColorId, productQuantity]) => {
            let productColor = await ProductColor.findById(productColorId);

            if (!productColor) throw new ErrorResponse("No product color found", 404);

            await productColor.updateProductQuantityByColor(productQuantity);
        });
        await Promise.all(updateProductByColorPromises);

        res.status(200).json({
            success: true,
            message: "Confirm import successfully",
            data: imp
        });
    } catch (error) {
        next(error);
    }
};

exports.cancelImport = async (req, res, next) => {
    const { importId } = req.params;

    if (!importId || !mongoose.Types.ObjectId.isValid(importId))
        return next(new ErrorResponse("Please provide valid import's ID", 400));

    try {
        const imp = await Import.findByIdAndUpdate(importId, {
            importStatus: "Đã hủy"
        });

        if (!imp)
            return next(new ErrorResponse("No import found", 404));
        
        res.status(200).json({
            success: true,
            message: "Cancel import successfully",
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
    const { importId, productId, supplierId, productColorId, productQuantity } = req.body;

    try {
        const importDetail = await ImportDetail.create({
            importId,
            productId,
            supplierId,
            productColorId,
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

    const { importId, productId, supplierId, productColorId, productQuantity } = req.body;

    try {
        const importDetail = await ImportDetail.findByIdAndUpdate(importDetailId, {
            importId,
            productId,
            supplierId,
            productColorId,
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