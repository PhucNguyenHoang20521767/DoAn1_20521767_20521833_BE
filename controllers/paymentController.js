const mongoose = require("mongoose");
const Payment = require("../models/payment");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllPayments = async (req, res, next) => {
    let options = {};

    let total = Payment.countDocuments(options);
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || parseInt(await total);
    let last_page = Math.ceil(parseInt(await total)/limit);
    if (last_page < 1 && total > 0) {
        last_page = 1
    }

    try {
        const payments = await Payment.find(options);
        res.status(200).json({
            success: true,
            message: "List of payments fetched successfully",
            data: payments,
            total: (await total).toString(),
            page: (await page).toString(),
            last_page: (await last_page).toString()
        });
    } catch (error) {
        next(error);
    }
};

exports.getPaymentById = async (req, res, next) => {
    const { paymentId } = req.params;

    if (!paymentId || !mongoose.Types.ObjectId.isValid(paymentId))
        return next(new ErrorResponse("Please provide valid payment's ID", 400));

    try {
        const payment = await Payment.findById(paymentId);

        if (!payment)
            return next(new ErrorResponse("No payment found", 404));
        
        res.status(200).json({
            success: true,
            data: payment
        });
    } catch (error) {
        next(error);
    }
};

exports.createPayment = async (req, res, next) => {
    const { paymentType } = req.body;

    try {
        const payment = await Payment.create({
            paymentType
        });

        res.status(201).json({
            success: true,
            message: "Payment created successfully",
            data: payment
        });
    } catch (error) {
        next(error);
    }
};

exports.updatePayment = async (req, res, next) => {
    const { paymentId } = req.params;

    if (!paymentId || !mongoose.Types.ObjectId.isValid(paymentId))
        return next(new ErrorResponse("Please provide valid payment's ID", 400));

    const { paymentType } = req.body;

    try {
        const payment = await Payment.findByIdAndUpdate(paymentId, {
            paymentType  
        });

        if (!payment)
            return next(new ErrorResponse("No payment found", 404));
        
        res.status(200).json({
            success: true,
            message: "Payment updated successfully",
            data: payment
        });
    } catch (error) {
        next(error);
    }
};

exports.deletePayment = async (req, res, next) => {
    const { paymentId } = req.params;

    if (!paymentId || !mongoose.Types.ObjectId.isValid(paymentId))
        return next(new ErrorResponse("Please provide valid payment's ID", 400));

    try {
        const payment = await Payment.findByIdAndDelete(paymentId);

        if (!payment)
            return next(new ErrorResponse("No payment found", 404));
        
        res.status(200).json({
            success: true,
            message: "Payment deleted successfully",
            data: payment
        });
    } catch (error) {
        next(error);
    }
};

exports.activeOrInactivePayment = async(req, res, next) => {
    const { paymentId } = req.params;

    if (!paymentId || !mongoose.Types.ObjectId.isValid(paymentId))
        return next(new ErrorResponse("Please provide valid payment's ID", 400));

    try {
        const payment = await Payment.findById(paymentId);

        if (!payment)
            return next(new ErrorResponse("No payment found", 404));

        await payment.updateOne({
            paymentStatus: !payment.paymentStatus
        });
        await payment.save();

        res.status(200).json({
            success: true,
            message: `Payment ${payment.paymentStatus ? "deactivated" : "activated"} successfully`
        });
    } catch (error) {
        next(error);
    }
};