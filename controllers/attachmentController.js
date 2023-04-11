const mongoose = require("mongoose");
const Attachment = require("../models/Attachment");
const ErrorResponse = require("../utils/errorResponse");
const fs = require("fs");

exports.saveAttachment = async (req, res, next) => {
	let attachmentsList = req.files
		? req.files.map((file) => {
				return {
					attachmentMimeType: file.mimetype,
					attachmentName: file.filename,
					attachmentSize: file.size,
				};
		  })
		: [];

	if (!attachmentsList.length)
		return next(new ErrorResponse("No attachments added", 404));

	try {
		const attachment = await Attachment.insertMany(attachmentsList);

		res.status(201).json({
			success: true,
			message: "Attachments uploaded successfully",
			data: attachment,
		});
	} catch (error) {
		next(error);
	}
};

exports.previewAttachment = async (req, res, next) => {
	const { attachmentId } = req.params;

	if (!attachmentId || !mongoose.Types.ObjectId.isValid(attachmentId))
		res.status(404).send();

	try {
		const attachment = await Attachment.findById(attachmentId);

		if (!attachment) next(new ErrorResponse("No attachment found", 404));

		let imageBuffer = fs.readFileSync("../file_bucket/" + attachment.attachmentName);
		res.setHeader("Content-Type", attachment.attachmentMimeType);
		res.send(imageBuffer);
	} catch (error) {
		next(error);
	}
};

exports.previewAttachmentInfo = async (req, res, next) => {
	const { attachmentId } = req.params;

	if (!attachmentId || !mongoose.Types.ObjectId.isValid(attachmentId))
		return next(new ErrorResponse("Please provide valid attachment id", 400));

	try {
		const attachment = await Attachment.findById(attachmentId);

		if (!attachment) next(new ErrorResponse("No attachment found", 404));

		res.status(200).json({
			success: true,
			data: attachment,
		});
	} catch (error) {
		next(error);
	}
};

exports.previewAttachmentInfoList = async (req, res, next) => {
	try {
		res.status(200).json({
			success: true,
			message: "Attachments list fetched successfully",
			data: await Attachment.find().sort("-createdAt"),
			total: await Attachment.find().countDocuments(),
		});
	} catch (error) {
		next(error);
	}
};