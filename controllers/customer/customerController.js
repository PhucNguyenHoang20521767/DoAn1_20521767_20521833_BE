const mongoose = require("mongoose");
const Customer = require("../../models/customer");
const Attachment = require("../../models/attachment");
const ErrorResponse = require("../../utils/errorResponse");

exports.getAllCustomers = async (req, res, next) => {
    let options = {};

    let total = Customer.countDocuments(options);
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || parseInt(await total);
    let last_page = Math.ceil(parseInt(await total)/limit);
    if (last_page < 1 && total > 0) {
        last_page = 1
    }

    try {
        const customers = await Customer.find(options);
        res.status(200).json({
            success: true,
            message: "List of customers fetched successfully",
            data: customers,
            total: (await total).toString(),
            page: (await page).toString(),
            last_page: (await last_page).toString()
        });
    } catch (error) {
        next(error);
    }
};

exports.getCustomerById = async(req, res, next) => {
    const { customerId } = req.params;

    if (!customerId || !mongoose.Types.ObjectId.isValid(customerId))
        return next(new ErrorResponse("Please provide valid customer's ID", 400));
    
    try {
        const customer = await Customer.findById(customerId);

        if (!customer)
            return next(new ErrorResponse("No customer found", 404));

        res.status(200).json({
            success: true,
            data: customer
        });
    } catch(error) {
        next(error);
    }
};

exports.saveCustomerAvatar = async (req, res, next) => {
    const currentCustomer = req.user;

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

        const customer = await Customer.findByIdAndUpdate(currentCustomer._id, {
            customerAvatar: attachment[0]._id.toString() 
        });
        
        if (!customer)
            return next(new ErrorResponse("No customer found", 404));

        res.status(201).json({
            success: true,
            message: "Customer avatar saved successfully",
            data: customer
        });
    } catch (error) {
        next(error);
    }
};

exports.updateCustomer = async(req, res, next) => {
    const { customerId } = req.params;

    if (!customerId || !mongoose.Types.ObjectId.isValid(customerId))
        return next(new ErrorResponse("Please provide valid customer's ID", 400));

    const { customerFirstName, customerLastName, customerBirthday, customerEmail, customerGender } = req.body;

    try {
        const customer = await Customer.findByIdAndUpdate(customerId, {
            customerFirstName,
            customerLastName,
            customerBirthday,
            customerEmail,
            customerGender
        });

        if (customer) {
            res.status(200).json({
                success: true,
                message: "Customer updated successfully",
                data: customer
            });
        } else {
            return next(new ErrorResponse("Customer not found", 404));
        }
    } catch (error) {
        next(error);
    }
};

exports.updateCustomerByAdmin = async(req, res, next) => {
    const { customerId } = req.params;

    if (!customerId || !mongoose.Types.ObjectId.isValid(customerId))
        return next(new ErrorResponse("Please provide valid customer's ID", 400));

    const { customerPassword, customerFirstName, customerLastName, customerBirthday, customerEmail, customerGender } = req.body;

    try {
        const customer = await Customer.findByIdAndUpdate(customerId, {
            customerPassword,
            customerFirstName,
            customerLastName,
            customerBirthday,
            customerEmail,
            customerGender
        });

        if (customer) {
            res.status(200).json({
                success: true,
                message: "Customer updated successfully",
                data: customer
            });
        } else {
            return next(new ErrorResponse("Customer not found", 404));
        }
    } catch (error) {
        next(error);
    }
};

exports.deleteCustomer = async (req, res, next) => {
    const { customerId } = req.params;

    if (!customerId || !mongoose.Types.ObjectId.isValid(customerId))
        return next(new ErrorResponse("Please provide valid customer's ID", 400));

    try {
        const customer = await Customer.findByIdAndDelete(customerId);

        if (!customer)
            return next(new ErrorResponse("No customer found", 404));

        res.status(200).json({
            success: true,
            message: "Customer deleted successfully",
            data: customer
        });
    } catch (error) {
        next(error);
    }
};

exports.activeOrInactiveCustomer = async(req, res, next) => {
    const { customerId } = req.params;

    if (!customerId || !mongoose.Types.ObjectId.isValid(customerId))
        return next(new ErrorResponse("Please provide valid customer's ID", 400));

    try {
        const customer = await Customer.findById(customerId);

        if (!customer)
            return next(new ErrorResponse("No customer found", 404));

        await customer.updateOne({
            isActive: !customer.isActive
        });
        await customer.save();

        res.status(200).json({
            success: true,
            message: `Customer ${customer.isActive ? "deactivated" : "activated"} successfully`
        });
    } catch (error) {
        next(error);
    }
};