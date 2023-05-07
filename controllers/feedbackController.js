const mongoose = require("mongoose");
const Feedback = require("../models/feedback/feedback");
const FeedbackImage = require("../models/feedback/feedback_image");
const Attachment = require("../models/attachment");
const ErrorResponse = require("../utils/errorResponse");

const firebaseStorage = require("../config/firebase");
const { ref, deleteObject } = require("firebase/storage");

exports.getAllFeedbacks = async (req, res, next) => {
    let options = {};

    let total = Feedback.countDocuments(options);
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || parseInt(await total);
    let last_page = Math.ceil(parseInt(await total)/limit);
    if (last_page < 1 && total > 0) {
        last_page = 1
    }

    try {
        const feedbacks = await Feedback.find(options);
        res.status(200).json({
            success: true,
            message: "List of feedbacks fetched successfully",
            data: feedbacks,
            total: (await total).toString(),
            page: (await page).toString(),
            last_page: (await last_page).toString()
        });
    } catch (error) {
        next(error);
    }
};

exports.getFeedbackById = async (req, res, next) => {
    const { feedbackId } = req.params;

    if (!feedbackId || !mongoose.Types.ObjectId.isValid(feedbackId))
        return next(new ErrorResponse("Please provide valid feedback's ID", 400));

    try {
        const feedback = await Feedback.findById(feedbackId);

        if (!feedback)
            return next(new ErrorResponse("No feedback found", 404));
        
        res.status(200).json({
            success: true,
            data: feedback
        });
    } catch (error) {
        next(error);
    }
};

exports.createFeedback = async (req, res, next) => {
    const { customerId, productId, orderId, feedbackRating, feedbackTitle, feedbackContent } = req.body;

    try {
        const feedback = await Feedback.create({
            customerId,
            productId,
            orderId,
            feedbackRating,
            feedbackTitle,
            feedbackContent
        });

        res.status(201).json({
            success: true,
            message: "Feedback created successfully",
            data: feedback
        });
    } catch (error) {
        next(error);
    }
};

exports.updateFeedback = async (req, res, next) => {
    const { feedbackId } = req.params;

    if (!feedbackId || !mongoose.Types.ObjectId.isValid(feedbackId))
        return next(new ErrorResponse("Please provide valid feedback's ID", 400));

    const { customerId, productId, orderId, feedbackRating, feedbackTitle, feedbackContent } = req.body;

    try {
        const feedback = await Feedback.findByIdAndUpdate(feedbackId, {
            customerId,
            productId,
            orderId,
            feedbackRating,
            feedbackTitle,
            feedbackContent  
        });

        if (!feedback)
            return next(new ErrorResponse("No feedback found", 404));
        
        res.status(200).json({
            success: true,
            message: "Feedback updated successfully",
            data: feedback
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteFeedback = async (req, res, next) => {
    const { feedbackId } = req.params;

    if (!feedbackId || !mongoose.Types.ObjectId.isValid(feedbackId))
        return next(new ErrorResponse("Please provide valid feedback's ID", 400));

    try {
        const feedback = await Feedback.findByIdAndDelete(feedbackId);

        if (!feedback)
            return next(new ErrorResponse("No feedback found", 404));
        
        res.status(200).json({
            success: true,
            message: "Feedback deleted successfully",
            data: feedback
        });
    } catch (error) {
        next(error);
    }
};

// Feedback Image
exports.getAllFeedbackImages = async (req, res, next) => {
    const { feedbackId } = req.params;

    if (!feedbackId || !mongoose.Types.ObjectId.isValid(feedbackId)) {
        return next(new ErrorResponse("Please provide valid feedback's ID", 400));
    }

    try {
        const feedImgs = await FeedbackImage.find({
            feedbackId: feedbackId,
        }).select("-feedbackId");

        res.status(200).json({
            success: true,
            message: "List of feedback images fetched successfully",
            data: feedImgs
        });
    } catch (error) {
        next(error);
    }
};

exports.saveFeedbackImage = async (req, res, next) => {
    const { feedbackId } = req.params;

    if (!feedbackId || !mongoose.Types.ObjectId.isValid(feedbackId)) {
        return next(new ErrorResponse("Please provide valid feedback's ID", 400));
    }

    let attachmentsList = req.files
		? req.files.map((file) => {
				return {
					attachmentMimeType: file.mimetype,
					attachmentName: file.originalname,
					attachmentSize: file.size,
				};
		  })
		: [];

    if (!attachmentsList.length)
		return next(new ErrorResponse("No attachments added", 404));

    try {
        const attachment = await Attachment.insertMany(attachmentsList);

        await FeedbackImage.insertMany(
            Array.from(attachment, (att) => {
                return {
                    feedbackId: feedbackId,
                    feedbackImage: att._id.toString()
                };
            })
        );

        res.status(201).json({
            success: true,
            message: "Feedback image added successfully"
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteFeedbackImage = async (req, res, next) => {
    const { feedbackImageId } = req.params;

    if (!feedbackImageId || !mongoose.Types.ObjectId.isValid(feedbackImageId)) {
        return next(new ErrorResponse("Please provide valid feedback image's ID", 400));
    }

    try {
        const feedImg = await FeedbackImage.findByIdAndDelete(feedbackImageId);
        const attachment = await Attachment.findByIdAndDelete(feedImg.feedbackImage);

        await deleteObject(ref(firebaseStorage, `attachments/${attachment.attachmentName}`));

        res.status(200).json({
            success: true,
            message: "Feedback image deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};