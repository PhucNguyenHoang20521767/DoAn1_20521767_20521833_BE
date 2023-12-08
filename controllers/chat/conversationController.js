const mongoose = require("mongoose");
const Conversation = require("../../models/chat/conversation");
const ErrorResponse = require("../../utils/errorResponse");

// ADMIN Side
exports.getAllConversations = async (req, res, next) => {
    let options = {};

    if (req.search) {
        options = {
            ...options
        }
    }

    let total = Conversation.countDocuments(options);
    let limit = req.pagination.limit === "TOTAL" ? parseInt(await total) : req.pagination.limit;
    let skip = (req.pagination.page - 1) * limit;
    let lastPage = Math.ceil(parseInt(await total) / req.pagination.limit);
    
    if (lastPage < 1 && total > 0) {
        lastPage = 1
    }

    try {
        const conversations = await Conversation
            .find(options)
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);

        res.status(200).json({
            success: true,
            message: "List of conversations fetched successfully",
            data: conversations,
            total: (await total).toString(),
            page: (await req.pagination.page).toString(),
            lastPage: (await lastPage).toString()
        });
    } catch (error) {
        next(error);
    }
};

exports.getConversationById = async (req, res, next) => {
    const { conversationId } = req.params;

    if (!conversationId || !mongoose.Types.ObjectId.isValid(conversationId))
        return next(new ErrorResponse("Please provide valid conversation's ID", 400));

    try {
        const conversation = await Conversation.findById(conversationId);

        if (!conversation)
            return next(new ErrorResponse("No conversation found", 404));

        res.status(200).json({
            success: true,
            data: conversation
        });
    } catch {
        next(error);
    }
};

exports.createConversation = async (req, res, next) => {
    const { customerId } = req.body;

    if (!customerId || !mongoose.Types.ObjectId.isValid(customerId))
        return next(new ErrorResponse("Please provide valid customer's ID", 400));

    try {
        const conversation = await Conversation.findOne({ customerId: customerId });
        
        if (conversation)
            return next(new ErrorResponse("Conversation already exists", 404));

        await Conversation.create({
            customerId
        });

        res.status(201).json({
            success: true,
            message: "Create conversation successfully"
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteConversation = async (req, res, next) => {
    const { conversationId } = req.params;

    if (!conversationId || !mongoose.Types.ObjectId.isValid(conversationId))
        return next(new ErrorResponse("Please provide valid conversation's ID", 400));

    try {
        const conversation = await Conversation.findByIdAndDelete(conversationId);

        if (!conversation)
            return next(new ErrorResponse("No conversation found", 404));

        res.status(200).json({
            success: true,
            message: "Delete conversation successfully",
            data: conversation
        });
    } catch {
        next(error);
    }
};

// CUSTOMER Side
exports.getUserConversation = async (req, res, next) => {
    const currentUser = req.user;

    try {
        const conversation = await Conversation.find({
            customerId: currentUser._id
        });

        if (!conversation)
            return next(new ErrorResponse("No conversation found", 404));

        res.status(200).json({
            success: true,
            data: conversation
        });
    } catch (error) {
        next(error);
    }
};

exports.createConversationForCustomer = async (req, res, next) => {
    const currentUser = req.user;

    try {
        const conversation = await Conversation.findOne({ customerId: currentUser._id });
        
        if (conversation)
            return next(new ErrorResponse("Conversation already exists", 404));

        await Conversation.create({
            customerId: currentUser._id
        });

        res.status(201).json({
            success: true,
            message: "Create conversation successfully"
        });
    } catch (error) {
        next(error);
    }
};