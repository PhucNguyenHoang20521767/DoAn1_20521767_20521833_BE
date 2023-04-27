const mongoose = require("mongoose");
const Campaign = require("../models/campaign");
const Attachment = require("../models/attachment");
const ErrorResponse = require("../utils/errorResponse");

const firebaseStorage = require("../config/firebase");
const { ref, deleteObject } = require("firebase/storage");

exports.getAllCampaigns = async (req, res, next) => {
    let options = {};

    let total = Campaign.countDocuments(options);
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || parseInt(await total);
    let last_page = Math.ceil(parseInt(await total)/limit);
    if (last_page < 1 && total > 0) {
        last_page = 1
    }

    try {
        const campaigns = await Campaign.find(options);
        res.status(200).json({
            success: true,
            message: "List of campaigns fetched successfully",
            data: campaigns,
            total: (await total).toString(),
            page: (await page).toString(),
            last_page: (await last_page).toString()
        });
    } catch (error) {
        next(error);
    }
};

exports.getCampaignById = async (req, res, next) => {
    const { campaignId } = req.params;

    if (!campaignId || !mongoose.Types.ObjectId.isValid(campaignId))
        return next(new ErrorResponse("Please provide valid campaign's ID", 400));

    try {
        const campaign = await Campaign.findById(campaignId);

        if (!campaign)
            return next(new ErrorResponse("No campaign found", 404));
        
        res.status(200).json({
            success: true,
            data: campaign
        });
    } catch (error) {
        next(error);
    }
};

exports.createCampaign = async (req, res, next) => {
    const { campaignName, campaignStartDate, campaignEndDate } = req.body;

    try {
        const campaign = await Campaign.create({
            campaignName,
            campaignStartDate,
            campaignEndDate
        });

        res.status(201).json({
            success: true,
            message: "Campaign created successfully",
            data: campaign
        });
    } catch (error) {
        next(error);
    }
};

exports.saveCampaignImage = async (req, res, next) => {
    const { campaignId } = req.params;

    if (!campaignId || !mongoose.Types.ObjectId.isValid(campaignId))
        return next(new ErrorResponse("Please provide valid campaign's ID", 400));


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

    if (attachmentsList.length > 1)
		return next(new ErrorResponse("Only one attachment can be selected", 400));

    try {
        const attachment = await Attachment.insertMany(attachmentsList);

        const campaign = await Campaign.findByIdAndUpdate(campaignId, {
            campaignImage: attachment[0]._id.toString() 
        });
        
        if (!campaign)
            return next(new ErrorResponse("No campaign found", 404));

        res.status(201).json({
            success: true,
            message: "Campaign image saved successfully",
            data: campaign
        });
    } catch (error) {
        next(error);
    }
};

exports.updateCampaign = async (req, res, next) => {
    const { campaignId } = req.params;

    if (!campaignId || !mongoose.Types.ObjectId.isValid(campaignId))
        return next(new ErrorResponse("Please provide valid campaign's ID", 400));

    const { campaignName, campaignStartDate, campaignEndDate } = req.body;

    try {
        const campaign = await Campaign.findByIdAndUpdate(campaignId, {
            campaignName,
            campaignStartDate,
            campaignEndDate  
        });

        if (!campaign)
            return next(new ErrorResponse("No campaign found", 404));
        
        res.status(200).json({
            success: true,
            message: "Campaign updated successfully",
            data: campaign
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteCampaign = async (req, res, next) => {
    const { campaignId } = req.params;

    if (!campaignId || !mongoose.Types.ObjectId.isValid(campaignId))
        return next(new ErrorResponse("Please provide valid campaign's ID", 400));

    try {
        const campaign = await Campaign.findByIdAndDelete(campaignId);

        if (!campaign)
            return next(new ErrorResponse("No campaign found", 404));

        if (campaign.campaignImage) {
            const attachment = await Attachment.findByIdAndDelete(campaign.campaignImage);

            await deleteObject(ref(firebaseStorage, `attachments/${attachment.attachmentName}`));
        }
        
        res.status(200).json({
            success: true,
            message: "Campaign deleted successfully",
            data: campaign
        });
    } catch (error) {
        next(error);
    }
};