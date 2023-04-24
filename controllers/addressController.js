const mongoose = require("mongoose");
const Address = require("../models/address");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllAddresses = async (req, res, next) => {
    let options = {};

    let total = Address.countDocuments(options);
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || parseInt(await total);
    let last_page = Math.ceil(parseInt(await total)/limit);
    if (last_page < 1 && total > 0) {
        last_page = 1
    }

    try {
        const addresses = await Address.find(options);
        res.status(200).json({
            success: true,
            message: "List of addresses fetched successfully",
            data: addresses,
            total: (await total).toString(),
            page: (await page).toString(),
            last_page: (await last_page).toString()
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllCustomerAddresses = async (req, res, next) => {
    const { customerId } = req.params;

    if (!customerId || !mongoose.Types.ObjectId.isValid(customerId)) {
        return next(new ErrorResponse("Please provide valid customer's ID", 400));
    }

    try {
        const customerAddresses = await Address.find({
            customerId: customerId,
        });

        res.status(200).json({
            success: true,
            message: "List of customer addresses fetched successfully",
            data: customerAddresses
        });
    } catch (error) {
        next(error);
    }
};

exports.getAddressById = async (req, res, next) => {
    const { addressId } = req.params;

    if (!addressId || !mongoose.Types.ObjectId.isValid(addressId))
        return next(new ErrorResponse("Please provide valid address's ID", 400));

    try {
        const address = await Address.findById(addressId);

        if (!address)
            return next(new ErrorResponse("No address found", 404));
        
        res.status(200).json({
            success: true,
            data: address
        });
    } catch (error) {
        next(error);
    }
};

exports.createAddress = async (req, res, next) => {
    const { customerId } = req.params;

    if (!customerId || !mongoose.Types.ObjectId.isValid(customerId))
        return next(new ErrorResponse("Please provide valid customer's ID", 400));

    const { receiverFirstName, receiverLastName, receiverPhone, receiverAddress, receiverWard, receiverDistrict, receiverCity, isDefault } = req.body;

    try {
        if (isDefault) {
            await Address.updateMany(
                { customerId: customerId },
                { isDefault: false }
            );

            const addressDefault = await Address.create({
                customerId,
                receiverFirstName,
                receiverLastName,
                receiverPhone,
                receiverAddress,
                receiverWard,
                receiverDistrict,
                receiverCity,
                isDefault
            });

            res.status(201).json({
                success: true,
                message: "Address created successfully",
                data: addressDefault
            });
        } else {
            const addressNotDefault = await Address.create({
                customerId,
                receiverFirstName,
                receiverLastName,
                receiverPhone,
                receiverAddress,
                receiverWard,
                receiverDistrict,
                receiverCity,
                isDefault
            });
    
            res.status(201).json({
                success: true,
                message: "Address created successfully",
                data: addressNotDefault
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.updateAddress = async (req, res, next) => {
    const { addressId } = req.params;

    if (!addressId || !mongoose.Types.ObjectId.isValid(addressId))
        return next(new ErrorResponse("Please provide valid address's ID", 400));

    const { receiverFirstName, receiverLastName, receiverPhone, receiverAddress, receiverWard, receiverDistrict, receiverCity, isDefault } = req.body;

    try {
        if (isDefault) {
            const addressDefault = await Address.findById(addressId);

            if (!addressDefault) {
                return next(new ErrorResponse("No address found", 404));
            }

            await Address.updateMany(
                { customerId: addressDefault.customerId },
                { isDefault: false }
            );

            await addressDefault.updateOne({
                receiverFirstName,
                receiverLastName,
                receiverPhone,
                receiverAddress,
                receiverWard,
                receiverDistrict,
                receiverCity,
                isDefault
            });

            await addressDefault.save();
            
            res.status(200).json({
                success: true,
                message: "Address updated successfully",
                data: addressDefault
            });
        } else {
            const addressNotDefault = await Address.findByIdAndUpdate(addressId, {
                receiverFirstName,
                receiverLastName,
                receiverPhone,
                receiverAddress,
                receiverWard,
                receiverDistrict,
                receiverCity,
                isDefault
            });
    
            if (!addressNotDefault)
                return next(new ErrorResponse("No address found", 404));
            
            res.status(200).json({
                success: true,
                message: "Address updated successfully",
                data: addressNotDefault
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.deleteAddress = async (req, res, next) => {
    const { addressId } = req.params;

    if (!addressId || !mongoose.Types.ObjectId.isValid(addressId))
        return next(new ErrorResponse("Please provide valid address's ID", 400));

    try {
        const address = await Address.findByIdAndDelete(addressId);

        if (!address)
            return next(new ErrorResponse("No address found", 404));
        
        res.status(200).json({
            success: true,
            message: "Address deleted successfully",
            data: address
        });
    } catch (error) {
        next(error);
    }
};

exports.setDefaultAddress = async(req, res, next) => {
    const { addressId } = req.params;

    if (!addressId || !mongoose.Types.ObjectId.isValid(addressId))
        return next(new ErrorResponse("Please provide valid address's ID", 400));

    try {
        const address = await Address.findById(addressId);

        if (!address)
            return next(new ErrorResponse("No address found", 404));

        if (address.isDefault) {
            res.status(200).json({
                success: true,
                message: "Set default successfully"
            });
        } else {
            await Address.updateMany(
                { customerId: address.customerId },
                { isDefault: false }
            );
    
            await address.updateOne({
                isDefault: true
            });
            await address.save();
    
            res.status(200).json({
                success: true,
                message: "Set default successfully"
            });
        }
    } catch (error) {
        next(error);
    }
};