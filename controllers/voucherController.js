const mongoose = require("mongoose");
const Voucher = require("../models/voucher");
const Order = require("../models/order/order");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllValidVouchers = async (req, res, next) => {
    const currentCustomer = req.user;

    let options = {
        isActive: true,
        voucherEndDate: {
            $gte: new Date()
        }
    };
    
    try {
        const vouchers = await Voucher.find(options);

        const result = await Promise.all(vouchers.map(async (voucher) => {
            const orders = await Order.find({
                customerId: currentCustomer._id,
                voucherId: voucher._id
            });

            if (orders.length > 0) return null;

            return voucher;
        }));

        res.status(200).json({
            success: true,
            message: "List of valid vouchers fetched successfully",
            data: result.filter((voucher) => voucher !== null)
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllVouchers = async (req, res, next) => {
    let options = {};

    if (req.search) {
        options = { ...options }
    }

    let total = Voucher.countDocuments(options);
    let limit = req.pagination.limit === "TOTAL" ? parseInt(await total) : req.pagination.limit;
    let skip = (req.pagination.page - 1) * limit;
    let lastPage = Math.ceil(parseInt(await total) / req.pagination.limit);
    
    if (lastPage < 1 && total > 0) {
        lastPage = 1
    }

    try {
        const vouchers = await Voucher
            .find(options)
            .limit(limit)
            .skip(skip);

        res.status(200).json({
            success: true,
            message: "List of vouchers fetched successfully",
            data: vouchers,
            total: (await total).toString(),
            page: (await req.pagination.page).toString(),
            lastPage: (await lastPage).toString()
        });
    } catch (error) {
        next(error);
    }
};

exports.getVoucherById = async (req, res, next) => {
    const { voucherId } = req.params;

    if (!voucherId || !mongoose.Types.ObjectId.isValid(voucherId))
        return next(new ErrorResponse("Please provide valid voucher's ID", 400));

    try {
        const voucher = await Voucher.findById(voucherId);

        if (!voucher)
            return next(new ErrorResponse("No voucher found", 404));

        res.status(200).json({
            success: true,
            data: voucher
        });
    } catch (error) {
        next(error);
    }
};

exports.createVoucher = async (req, res, next) => {
    const {
        voucherType,
        voucherValue,
        minOrderPrice,
        maxDiscountPrice,
        voucherEndDate
    } = req.body;

    try {
        const voucher = await Voucher.create({
            voucherType,
            voucherValue,
            minOrderPrice,
            maxDiscountPrice,
            voucherEndDate
        });

        res.status(200).json({
            success: true,
            message: "Create voucher successfully",
            data: voucher
        });
    } catch (error) {
        next(error);
    }
};

exports.updateVoucher = async (req, res, next) => {
    const { voucherId } = req.params;

    if (!voucherId || !mongoose.Types.ObjectId.isValid(voucherId))
        return next(new ErrorResponse("Please provide valid voucher's ID", 400));

    const {
        voucherType,
        voucherValue,
        minOrderPrice,
        maxDiscountPrice,
        voucherEndDate
    } = req.body;

    try {
        const voucher = await Voucher.findByIdAndUpdate(voucherId, {
            voucherType,
            voucherValue,
            minOrderPrice,
            maxDiscountPrice,
            voucherEndDate
        });

        if (!voucher)
            return next(new ErrorResponse("No voucher found", 404));

        res.status(200).json({
            success: true,
            message: "Update voucher successfully"
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteVoucher = async (req, res, next) => {
    const { voucherId } = req.params;

    if (!voucherId || !mongoose.Types.ObjectId.isValid(voucherId))
        return next(new ErrorResponse("Please provide valid voucher's ID", 400));

    try {
        const voucher = await Voucher.findByIdAndDelete(voucherId);

        if (!voucher)
            return next(new ErrorResponse("No voucher found", 404));

        res.status(200).json({
            success: true,
            message: "Delete voucher successfully"
        });
    } catch (error) {
        next(error);
    }
};

exports.activeOrInactiveVoucher = async (req, res, next) => {
    const { voucherId } = req.params;

    if (!voucherId || !mongoose.Types.ObjectId.isValid(voucherId))
        return next(new ErrorResponse("Please provide valid voucher's ID", 400));

    try {
        const voucher = await Voucher.findById(voucherId);

        if (!voucher)
            return next(new ErrorResponse("No voucher found", 404));

        await voucher.updateOne({
            isActive: !voucher.isActive
        });
        await voucher.save();

        res.status(200).json({
            success: true,
            message: `${voucher.isActive ? "Inactive" : "Active"} voucher successfully`
        });
    } catch (error) {
        next(error);
    }
};