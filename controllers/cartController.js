const mongoose = require("mongoose");
const Cart = require("../models/cart/cart");
const CartItem = require("../models/cart/cart_item");
const ErrorResponse = require("../utils/errorResponse");

exports.getCustomerCart = async (req, res, next) => {
    const customer = req.user;

    try {
        const cart = await Cart.find({ customerId: customer._id });

        if (!cart)
            return next(new ErrorResponse("No cart found", 404));

        res.status(200).json({
            success: true,
            message: "Get customer's cart successfully",
            data: cart
        });
    } catch (error) {
        next(error);
    }
};

exports.createCart = async (req, res, next) => {
    const customer = req.user;

    try {
        const cart = await Cart.create({ customerId: customer._id });

        res.status(201).json({
            success: true,
            message: "Create customer's cart successfully",
            data: cart
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteCart = async (req, res, next) => {
    const customer = req.user;

    try {
        const cart = await Cart.deleteOne({ customerId: customer._id });

        if (!cart)
            return next(new ErrorResponse("No cart found", 404));

        res.status(200).json({
            success: true,
            message: "Delete customer's cart successfully",
            data: cart
        });
    } catch (error) {
        next(error);
    }
};

exports.activeOrInactiveCart = async(req, res, next) => {
    const customer = req.user;

    try {
        const cart = await Cart.find({ customerId: customer._id });

        if (!cart)
            return next(new ErrorResponse("No cart found", 404));

        await cart.updateOne({
            cartStatus: !cart.cartStatus
        });
        await cart.save();

        res.status(200).json({
            success: true,
            message: `Cart ${cart.cartStatus ? "deactivated" : "activated"} successfully`
        });
    } catch (error) {
        next(error);
    }
};

// Cart Items
exports.getAllCartItems = async (req, res, next) => {
    const { cartId } = req.params;

    if (!cartId || !mongoose.Types.ObjectId.isValid(cartId))
        return next(new ErrorResponse("Please provide valid cart's ID", 400));

    try {
        const cartItems = CartItem.find({ cartId: cartId });

        if (!cartItems)
            return next(new ErrorResponse("No item in cart", 404));

        res.status(200).json({
            success: true,
            message: "List of cart items fetched successfully",
            data: cartItems
        });
    } catch (error) {
        next(error);
    }
};

exports.addItemToCart = async (req, res, next) => {
    const { cartId } = req.params;

    if (!cartId || !mongoose.Types.ObjectId.isValid(cartId))
        return next(new ErrorResponse("Please provide valid cart's ID", 400));

    const { productId, productQuantity } = req.body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId))
        return next(new ErrorResponse("Please provide valid product's ID", 400));

    if (productQuantity <= 0)
        return next(new ErrorResponse("Product quantity must be greater than 0", 400));

    try {
        const cartItem = CartItem.create({
            cartId,
            productId,
            productQuantity
        });

        res.status(200).json({
            success: true,
            message: "Add item to cart successfully",
            data: cartItem
        });
    } catch (error) {
        next(error);
    }
};

exports.updateItemInCart = async (req, res, next) => {
    const { cartId } = req.params;

    if (!cartId || !mongoose.Types.ObjectId.isValid(cartId))
        return next(new ErrorResponse("Please provide valid cart's ID", 400));

    const { productId, productQuantity } = req.body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId))
        return next(new ErrorResponse("Please provide valid product's ID", 400));

    if (productQuantity <= 0)
        return next(new ErrorResponse("Product quantity must be greater than 0", 400));

    try {
        const cartItem = CartItem.updateOne(
            {
                cartId: cartId,
                productId: productId
            },
            { productQuantity: productQuantity }
        );

        if (!cartItem)
            return next(new ErrorResponse("No item found", 404));

        res.status(200).json({
            success: true,
            message: "Update item in cart successfully",
            data: cartItem
        });
    } catch (error) {
        next(error);
    }
};

exports.removeItemFromCart = async (req, res, next) => {
    const { cartId } = req.params;

    if (!cartId || !mongoose.Types.ObjectId.isValid(cartId))
        return next(new ErrorResponse("Please provide valid cart's ID", 400));

    const { productId } = req.body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId))
        return next(new ErrorResponse("Please provide valid product's ID", 400));
    try {
        const cartItem = CartItem.deleteOne({
            cartId: cartId,
            productId: productId
        });

        if (!cartItem)
            return next(new ErrorResponse("No item found", 404));

        res.status(200).json({
            success: true,
            message: "Remove item from cart successfully",
            data: cartItem
        });
    } catch (error) {
        next(error);
    }
};

exports.removeAllItemsFromCart = async (req, res, next) => {
    const { cartId } = req.params;

    if (!cartId || !mongoose.Types.ObjectId.isValid(cartId))
        return next(new ErrorResponse("Please provide valid cart's ID", 400));

    try {
        const cartItems = CartItem.deleteMany({
            cartId: cartId
        });

        if (!cartItems)
            return next(new ErrorResponse("No item found", 404));

        res.status(200).json({
            success: true,
            message: "Remove all items from cart successfully",
            data: cartItems
        });
    } catch (error) {
        next(error);
    }
};