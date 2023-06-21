const mongoose = require("mongoose");
const Order = require("../models/order/order");
const OrderItem = require("../models/order/order_item");
const Customer = require("../models/customer");
const Product = require("../models/product/product");
const ProductColor = require("../models/product/product_color");
const ErrorResponse = require("../utils/errorResponse");
const { sendEmail } = require("../config/sendEmail");

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

exports.updateOrderStatus = async (req, res, next) => {
    const { orderId } = req.params;

    if (!orderId || !mongoose.Types.ObjectId.isValid(orderId))
        return next(new ErrorResponse("Please provide valid order's ID", 400));

    const { staffId, orderStatus, cancelReason } = req.body;

    if (!staffId || !mongoose.Types.ObjectId.isValid(staffId))
        return next(new ErrorResponse("Please provide valid staff's ID", 400));

    try {
        const order = await Order.findById(orderId);

        if (!order)
            return next(new ErrorResponse("No order found", 404));

        const orderItems = await OrderItem.find({
            orderId: orderId
        });

        // Update product quantity
        switch (orderStatus) {
            case "Đã xác nhận":
                switch (order.orderStatus) {
                    case "Đặt hàng":
                        await reduceProductQuantity(orderItems);
                        break;
                    default:
                        break;
                }
                break;
            case "Đã hủy":
                switch (order.orderStatus) {
                    case "Đã xác nhận":
                        await updateProductQuantity(orderItems);
                        break;
                    default:
                        break;
                }
                break;
            case "Bị trả lại":
                switch (order.orderStatus) {
                    case "Đang vận chuyển":
                        await updateProductQuantity(orderItems);
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }

        // Update order status
        await order.updateOne({
            staffId: staffId,
            orderStatus: orderStatus
        });
        await order.save();

        // Send email to customer
        const customer = await Customer.findById(order.customerId);

        if (!customer)
            return next(new ErrorResponse("No customer found", 404));

        sendOrderStatusEmail(order, orderStatus, customer.customerEmail, cancelReason, 200, res);
    } catch (error) {
        next(error);
    }
};

const updateProductQuantity = async (orderItems) => {
    const productQuantityMap = new Map();
    const productQuantityMapByColor = new Map();

    // Aggregate the quantities for the same product
    orderItems.forEach((item) => {
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
};

const reduceProductQuantity = async (orderItems) => {
    const productQuantityMap = new Map();
    const productQuantityMapByColor = new Map();

    // Aggregate the quantities for the same product
    orderItems.forEach((item) => {
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

    const reduceProductPromises = Array.from(productQuantityMap.entries()).map(async ([productId, productQuantity]) => {
        let product = await Product.findOne({
            _id: productId,
            productStatus: true
        });

        if (!product) throw new ErrorResponse("No product found", 404);

        await product.reduceProductQuantity(productQuantity);
    });
    await Promise.all(reduceProductPromises);

    const reduceProductByColorPromises = Array.from(productQuantityMapByColor.entries()).map(async ([productColorId, productQuantity]) => {
        let productColor = await ProductColor.findById(productColorId);

        if (!productColor) throw new ErrorResponse("No product color found", 404);

        await productColor.reduceProductQuantityByColor(productQuantity);
    });
    await Promise.all(reduceProductByColorPromises);
};

const sendOrderStatusEmail = async (order, orderStatus, customerEmail, cancelReason, statusCode, res) => {
    if (orderStatus === "Đang vận chuyển") {
        await sendEmail(
            customerEmail,
            "Trạng thái đơn hàng",
            `Cảm ơn bạn vì đã lựa chọn thương hiệu của chúng tôi.\nChúng tôi xin thông báo đơn hàng #${order.orderCode} của bạn đã được xác nhận và đang trong quá trình vận chuyển.\nNGUYEN'S HOME Furniture`
        );
    } else if (orderStatus === "Đã hủy") {
        await sendEmail(
            customerEmail,
            "Trạng thái đơn hàng",
            `Cảm ơn bạn vì đã lựa chọn thương hiệu của chúng tôi.\nChúng tôi xin thông báo đơn hàng #${order.orderCode} của bạn đã bị hủy.\nLý do: ${cancelReason}.\nRất xin lỗi vì sự bất tiện này.\nNGUYEN'S HOME Furniture`
        );
    }

    res.status(statusCode).json({
        success: true,
        message: "Successful"
    });
};

exports.completeOrder = async (req, res, next) => {
    const { orderId } = req.params;

    if (!orderId || !mongoose.Types.ObjectId.isValid(orderId))
        return next(new ErrorResponse("Please provide valid order's ID", 400));

    const { orderCompleteDay } = req.body;

    try {
        const order = await Order.findById(orderId);

        if (!order)
            return next(new ErrorResponse("No order found", 404));

        await order.updateOne({
            orderStatus: "Đã hoàn tất",
            orderCompleteDay: orderCompleteDay
        });
        await order.save();

        // Update product sold
        const orderItems = await OrderItem.find({
            orderId: orderId
        });
        await updateProductSold(orderItems);

        res.status(200).json({
            success: true,
            message: "Order completed"
        });
    } catch (error) {
        next(error);
    }
};

const updateProductSold = async (orderItems) => {
    const productQuantityMap = new Map();

    // Aggregate the quantities for the same product
    orderItems.forEach((item) => {
        const productId = item.productId.toString();
        const productQuantity = item.productQuantity;

        if (productQuantityMap.has(productId)) {
            productQuantityMap.set(productId, productQuantityMap.get(productId) + productQuantity);
        } else {
            productQuantityMap.set(productId, productQuantity);
        }
    });

    const updateProductPromises = Array.from(productQuantityMap.entries()).map(async ([productId, productQuantity]) => {
        let product = await Product.findOne({
            _id: productId,
            productStatus: true
        });

        if (!product) throw new ErrorResponse("No product found", 404);

        await product.updateProductSold(productQuantity);
    });
    await Promise.all(updateProductPromises);
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
    const { orderId, productId, productColorId, productQuantity, productPrice, productSalePrice } = req.body;

    try {
        const orderItem = await OrderItem.create({
            orderId,
            productId,
            productColorId,
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

    const { orderId, productId, productColorId, productQuantity, productPrice, productSalePrice } = req.body;

    try {
        const orderItem = await OrderItem.findByIdAndUpdate(orderItemId, {
            orderId,
            productId,
            productColorId,
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