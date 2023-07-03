const mongoose = require("mongoose");
const ErrorResponse = require("../utils/errorResponse");

const Customer = require("../models/customer");
const Product = require("../models/product/product");
const Order = require("../models/order/order");
const OrderItem = require("../models/order/order_item");
const Import = require("../models/import/import");
const ImportDetail = require("../models/import/import_detail");

exports.countNewCustomers = async (req, res, next) => {
    try {
        const userCount = await Customer.countDocuments({
            isVerified: true,
            isActive: true
        });

        res.status(200).json({
            success: true,
            message: "Get number of customers successfully",
            count: (await userCount).toString()
        });
    } catch (error) {
        next(error);
    }
};

exports.countNewOrdersOfMonth = async (req, res, next) => {
    try {
        const today = new Date();

        const firstDayOfMonth = new Date(today.setDate(1));
        firstDayOfMonth.setHours(0, 0, 0, 0);

        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        lastDayOfMonth.setHours(0, 0, 0, 0);

        const orderCount = await Order.countDocuments({
            orderStatus: "Đã hoàn tất",
            orderCompleteDay: {
                $gte: new Date(firstDayOfMonth),
                $lt: new Date(lastDayOfMonth)
            }
        });

        res.status(200).json({
            success: true,
            message: "Get number of orders successfully",
            count: (await orderCount).toString()
        });
    } catch (error) {
        next(error);
    }
};

exports.getPercentGrowth = async (req, res, next) => {
    try {
        const today = new Date();

        const firstDayOfMonth = new Date(today.setDate(1));
        firstDayOfMonth.setHours(0, 0, 0, 0);

        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        lastDayOfMonth.setHours(0, 0, 0, 0);

        const orderCount = await Order.countDocuments({
            orderStatus: "Đã hoàn tất",
            orderCompleteDay: {
                $gte: new Date(firstDayOfMonth),
                $lt: new Date(lastDayOfMonth)
            }    
        });

        const day = new Date();
        day.setDate(1);
        day.setMonth(day.getMonth() - 1);

        const firstDayOfLastMonth = new Date(day);
        firstDayOfLastMonth.setHours(0, 0, 0, 0);

        const lastDayOfLastMonth = new Date(today.setDate(1));
        lastDayOfLastMonth.setHours(0, 0, 0, 0);

        const orderCountLastMonth = await Order.countDocuments({
            orderStatus: "Đã hoàn tất",
            orderCompleteDay: {
                $gte: new Date(firstDayOfLastMonth),
                $lt: new Date(lastDayOfLastMonth)
            }  
        });

        const percent = (await (orderCount / orderCountLastMonth - 1)) * 100;

        res.status(200).json({
            success: true,
            message: "Successful",
            percent: parseFloat((Math.round(percent * 100) / 100).toFixed(2))
        });
    } catch (error) {
        next(error);
    }
};

exports.getImportTotalPriceOfMonth = async (req, res, next) => {
    try {
        const today = new Date();

        const firstDayOfMonth = new Date(today.setDate(1));
        firstDayOfMonth.setHours(0, 0, 0, 0);

        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        lastDayOfMonth.setHours(0, 0, 0, 0);

        const importsList = await Import.find({
            importStatus: "Đã xác nhận",
            importDate: {
                $gte: new Date(firstDayOfMonth),
                $lt: new Date(lastDayOfMonth)
            }
        });

        let importTotal = 0;
        await Promise.all(importsList.map(async (imp) => {
            const impDetailsList = await ImportDetail.find({
                importId: imp._id,
            });

            await Promise.all(impDetailsList.map(async (impDetail) => {
                const product = await Product.findById(impDetail.productId);

                importTotal += (product.productPrice * impDetail.productQuantity);
            }));
        }));

        res.status(200).json({
            success: true,
            message: "Get import total price successfully",
            total: parseFloat((Math.round(importTotal * 100) / 100).toFixed(2))
        });
    } catch (error) {
        next(error);
    }
};

exports.getRevenueOfMonth = async (req, res, next) => {
    try {
        const today = new Date();

        const firstDayOfMonth = new Date(today.setDate(1));
        firstDayOfMonth.setHours(0, 0, 0, 0);

        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        lastDayOfMonth.setHours(0, 0, 0, 0);

        const ordersList = await Order.find({
            orderStatus: "Đã hoàn tất",
            orderCompleteDay: {
                $gte: new Date(firstDayOfMonth),
                $lt: new Date(lastDayOfMonth)
            }
        });

        let revenue = 0;

        await Promise.all(ordersList.map(async (order) => {
            const orderItemsList = await OrderItem.find({
                orderId: order._id,
            });

            await Promise.all(orderItemsList.map(async (item) => {
                revenue += item.productPrice;
            }));
        }));

        res.status(200).json({
            success: true,
            message: "Get revenue of month successfully",
            revenue: parseFloat((Math.round(revenue * 100) / 100).toFixed(2))
        });
    } catch (error) {
        next(error);
    }
};

exports.getRevenueOfLastMonth = async (req, res, next) => {
    try {
        const today = new Date();
        const day = new Date();
        day.setDate(1);
        day.setMonth(day.getMonth() - 1);

        const firstDayOfLastMonth = new Date(day);
        firstDayOfLastMonth.setHours(0, 0, 0, 0);

        const lastDayOfLastMonth = new Date(today.setDate(1));
        lastDayOfLastMonth.setHours(0, 0, 0, 0);

        const ordersList = await Order.find({
            orderStatus: "Đã hoàn tất",
            orderCompleteDay: {
                $gte: new Date(firstDayOfLastMonth),
                $lt: new Date(lastDayOfLastMonth)
            }
        });

        let revenueOfLastMonth = 0;

        await Promise.all(ordersList.map(async (order) => {
            const orderItemsList = await OrderItem.find({
                orderId: order._id,
            });

            await Promise.all(orderItemsList.map(async (item) => {
                revenueOfLastMonth += item.productPrice;
            }));
        }));

        res.status(200).json({
            success: true,
            message: "Get revenue of last month successfully",
            revenue: parseFloat((Math.round(revenueOfLastMonth * 100) / 100).toFixed(2))
        });
    } catch (error) {
        next(error);
    }
};

exports.getOrderPerMonth = async (req, res, next) => {
    const { year } = req.params;

    try {
        const array = new Array(12);

        for (let i = 0; i < 12; i++) {
            const firstDay = new Date(year, i, 1);
            const lastDay = new Date(year, i + 1, 1);

            array[i] = await Order.countDocuments({
                orderStatus: "Đã hoàn tất",
                orderCompleteDay: {
                    $gte: new Date(firstDay),
                    $lt: new Date(lastDay)
                }
            });
        }

        res.status(200).json({
            success: true,
            message: "Get order per month successfully",
            result: array
        });
    } catch (error) {
        next(error);
    }
};

exports.getRevenuePerMonth = async (req, res, next) => {
    const { year } = req.params;

    try {
        const array = new Array(12);

        for (let i = 0; i < 12; i++) {
            array[i] = 0;
            const firstDay = new Date(year, i, 1);
            const lastDay = new Date(year, i + 1, 1);

            const ordersList = await Order.find({
                orderStatus: "Đã hoàn tất",
                orderCompleteDay: {
                    $gte: new Date(firstDay),
                    $lt: new Date(lastDay)
                }
            });

            await Promise.all(ordersList.map(async (order) => {
                const orderItemsList = await OrderItem.find({
                    orderId: order._id,
                });

                await Promise.all(orderItemsList.map(async (item) => {
                    array[i] += item.productPrice;
                }));
            }));
        }

        res.status(200).json({
            success: true,
            message: "Get revenue per month successfully",
            result: array
        });
    } catch (error) {
        next(error);
    }
};