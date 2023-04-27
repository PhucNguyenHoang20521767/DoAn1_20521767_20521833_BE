const mongoose = require("mongoose");
const Order = require("../models/order/order");
const OrderItem = require("../models/order/order_item");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllOrders = async (req, res, next) => {
    let options = {};

    let total = Order.countDocuments(options);
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || parseInt(await total);
    let last_page = Math.ceil(parseInt(await total)/limit);
    if (last_page < 1 && total > 0) {
        last_page = 1
    }

    try {
        const orders = await Order.find(options);
        res.status(200).json({
            success: true,
            message: "List of orders fetched successfully",
            data: orders,
            total: (await total).toString(),
            page: (await page).toString(),
            last_page: (await last_page).toString()
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllOrdersForCustomer = async (req, res, next) => {
    const customer = req.user;

    try {
        const orders = await Order.find({ customerId: customer._id });

        if (!orders)
            return next(new ErrorResponse("No order found", 404));

        res.status(200).json({
            success: true,
            message: "List of orders fetched successfully",
            data: orders
        });
    } catch (error) {
        next(error);
    }
};

exports.getOrderById = async (req, res, next) => {
    const { orderId } = req.params;

    if (!orderId || !mongoose.Types.ObjectId.isValid(orderId))
        return next(new ErrorResponse("Please provide valid order's ID", 400));

    try {
        const order = await Order.findById(orderId);

        if (!order)
            return next(new ErrorResponse("No order found", 404));
        
        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        next(error);
    }
};

exports.createOrder = async (req, res, next) => {
    const { customerId, orderCode, orderStatus, orderNote, orderAddress, paymentMethod, orderShippingFee } = req.body;

    try {
        const order = await Order.create({
            customerId,
            orderCode,
            orderStatus,
            orderNote,
            orderAddress,
            paymentMethod,
            orderShippingFee
        });

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: order
        });
    } catch (error) {
        next(error);
    }
};

exports.updateOrder = async (req, res, next) => {
    const { orderId } = req.params;

    if (!orderId || !mongoose.Types.ObjectId.isValid(orderId))
        return next(new ErrorResponse("Please provide valid order's ID", 400));

    const { customerId, staffId, orderCode, orderStatus, orderNote, orderAddress, paymentMethod, orderShippingFee, orderCompleteDay } = req.body;

    try {
        const order = await Order.findByIdAndUpdate(orderId, {
            customerId,
            staffId,
            orderCode,
            orderStatus,
            orderNote,
            orderAddress,
            paymentMethod,
            orderShippingFee,
            orderCompleteDay
        });

        if (!order)
            return next(new ErrorResponse("No order found", 404));
        
        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: order
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteOrder = async (req, res, next) => {
    const { orderId } = req.params;

    if (!orderId || !mongoose.Types.ObjectId.isValid(orderId))
        return next(new ErrorResponse("Please provide valid order's ID", 400));

    try {
        const order = await Order.findByIdAndDelete(orderId);

        if (!order)
            return next(new ErrorResponse("No order found", 404));
        
        res.status(200).json({
            success: true,
            message: "Order deleted successfully",
            data: order
        });
    } catch (error) {
        next(error);
    }
};

// Order Item
exports.getAllOrderItems = async (req, res, next) => {
    let options = {};

    let total = OrderItem.countDocuments(options);
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || parseInt(await total);
    let last_page = Math.ceil(parseInt(await total)/limit);
    if (last_page < 1 && total > 0) {
        last_page = 1
    }

    try {
        const orderItems = await OrderItem.find(options);
        res.status(200).json({
            success: true,
            message: "List of order items fetched successfully",
            data: orderItems,
            total: (await total).toString(),
            page: (await page).toString(),
            last_page: (await last_page).toString()
        });
    } catch (error) {
        next(error);
    }
};

exports.getOrderItemsForOrder = async (req, res, next) => {
    const { orderId } = req.params;

    if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
        return next(new ErrorResponse("Please provide valid order's ID", 400));
    }

    try {
        const orderItems = await OrderItem.find({ orderId: orderId });

        if (!orderItems)
            return next(new ErrorResponse("No order item found", 404));

        res.status(200).json({
            success: true,
            message: "List of order items fetched successfully",
            data: orderItems
        });
    } catch (error) {
        next(error);
    }
};

exports.getOrderItemById = async (req, res, next) => {
    const { orderItemId } = req.params;

    if (!orderItemId || !mongoose.Types.ObjectId.isValid(orderItemId))
        return next(new ErrorResponse("Please provide valid order item's ID", 400));

    try {
        const orderItem = await OrderItem.findById(orderItemId);

        if (!orderItem)
            return next(new ErrorResponse("No order item found", 404));
        
        res.status(200).json({
            success: true,
            data: orderItem
        });
    } catch (error) {
        next(error);
    }
};

exports.createOrderItem = async (req, res, next) => {
    const { orderId, productId, productQuantity, productPrice, productSalePrice } = req.body;

    try {
        const orderItem = await OrderItem.create({
            orderId,
            productId,
            productQuantity,
            productPrice,
            productSalePrice
        });

        res.status(201).json({
            success: true,
            message: "Order item created successfully",
            data: orderItem
        });
    } catch (error) {
        next(error);
    }
};

exports.updateOrderItem = async (req, res, next) => {
    const { orderItemId } = req.params;

    if (!orderItemId || !mongoose.Types.ObjectId.isValid(orderItemId))
        return next(new ErrorResponse("Please provide valid order item's ID", 400));

    const { orderId, productId, productQuantity, productPrice, productSalePrice } = req.body;

    try {
        const orderItem = await OrderItem.findByIdAndUpdate(orderItemId, {
            orderId,
            productId,
            productQuantity,
            productPrice,
            productSalePrice  
        });

        if (!orderItem)
            return next(new ErrorResponse("No order item found", 404));
        
        res.status(200).json({
            success: true,
            message: "Order item updated successfully",
            data: orderItem
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteOrderItem = async (req, res, next) => {
    const { orderItemId } = req.params;

    if (!orderItemId || !mongoose.Types.ObjectId.isValid(orderItemId))
        return next(new ErrorResponse("Please provide valid order item's ID", 400));

    try {
        const orderItem = await OrderItem.findByIdAndDelete(orderItemId);

        if (!orderItem)
            return next(new ErrorResponse("No order item found", 404));
        
        res.status(200).json({
            success: true,
            message: "Order item deleted successfully",
            data: orderItem
        });
    } catch (error) {
        next(error);
    }
};