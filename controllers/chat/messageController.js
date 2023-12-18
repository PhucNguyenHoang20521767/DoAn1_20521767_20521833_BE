const mongoose = require("mongoose");
const Message = require("../../models/chat/message");
const ErrorResponse = require("../../utils/errorResponse");

exports.getAllMessagesForConversation = async (req, res, next) => {
    const { conversationId } = req.params;

    if (!conversationId || !mongoose.Types.ObjectId.isValid(conversationId))
        return next(new ErrorResponse("Please provide valid conversation's ID", 400));

    try {
        const messages = await Message.find({
            conversationId: conversationId
        });

        res.status(200).json({
            success: true,
            messages: "List of messages fetched successfully",
            data: messages
        });
    } catch (error) {
        next(error);
    }
};

exports.getLastMessageForConversation = async (req, res, next) => {
    const { conversationId } = req.params;

    if (!conversationId || !mongoose.Types.ObjectId.isValid(conversationId))
        return next(new ErrorResponse("Please provide valid conversation's ID", 400));

    try {
        const messages = await Message.find({ conversationId: conversationId });
        const lastMessage = await Message.countDocuments({ conversationId: conversationId });

        res.status(200).json({
            success: true,
            messages: "Last message fetched successfully",
            data: messages[lastMessage - 1]
        });
    } catch (error) {
        next(error);
    }
};

exports.getNumberOfUnreadMessages = async (req, res, next) => {
    const { conversationId, senderId } = req.params;

    if (!conversationId || !mongoose.Types.ObjectId.isValid(conversationId))
        return next(new ErrorResponse("Please provide valid conversation's ID", 400));

    if (!senderId || !mongoose.Types.ObjectId.isValid(senderId))
        return next(new ErrorResponse("Please provide valid sender's ID", 400));

    try {
        const total = await Message.countDocuments({
            conversationId: conversationId,
            senderId: senderId,
            unreadMessage: true
        });

        res.status(200).json({
            success: true,
            messages: "Number of unread messages fetched successfully",
            data: total
        });
    } catch (error) {
        next(error);
    }
};

exports.createMessage = async (req, res, next) => {
    const { conversationId, senderId, messageText } = req.body;

    if (!conversationId || !mongoose.Types.ObjectId.isValid(conversationId))
        return next(new ErrorResponse("Please provide valid conversation's ID", 400));

    if (!senderId || !mongoose.Types.ObjectId.isValid(senderId))
        return next(new ErrorResponse("Please provide valid sender's ID", 400));
    
    try {
        await Message.create({
            conversationId,
            senderId,
            messageText
        });

        res.status(201).json({
            success: true,
            message: "Create message successfully"
        });
    } catch {
        next(error);
    }
};

exports.deleteMessage = async (req, res, next) => {
    const { messageId } = req.params;

    if (!messageId || !mongoose.Types.ObjectId.isValid(messageId))
        return next(new ErrorResponse("Please provide valid message's ID", 400));

    try {
        const message = await Message.findByIdAndDelete(messageId);

        if (!message)
            return next(new ErrorResponse("No message found", 404));

        res.status(200).json({
            success: true,
            message: "Delete message successfully"
        });
    } catch (error) {
        next(error);
    }
};

exports.markAllMessagesAsRead = async (req, res, next) => {
    const { conversationId } = req.params;

    if (!conversationId || !mongoose.Types.ObjectId.isValid(conversationId))
        return next(new ErrorResponse("Please provide valid conversation's ID", 400));

    try {
        await Message.updateMany(
            { conversationId: conversationId },
            { unreadMessage: false }
        );

        res.status(200).json({
            success: true,
            message: "Mark all messages as read successfully"
        });
    } catch (error) {
        next(error);
    }
};