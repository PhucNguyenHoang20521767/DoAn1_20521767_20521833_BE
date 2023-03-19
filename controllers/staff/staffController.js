const mongoose = require("mongoose");
const Staff = require("../../models/staff");
const ErrorResponse = require("../../utils/errorResponse");

exports.getAllStaffs = async (req, res, next) => {
    let options = { privilege: { $gte: 1 } };

    let total = Staff.countDocuments(options);
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || parseInt(await total);
    let last_page = Math.ceil(parseInt(await total)/limit);
    if (last_page < 1 && total > 0) {
        last_page = 1
    }

    try {
        const staffs = await Staff.find(options);
        res.status(200).json({
            success: true,
            message: "List of staffs fetched successfully",
            data: staffs,
            total: (await total).toString(),
            page: (await page).toString(),
            last_page: (await last_page).toString()
        });
    } catch (error) {
        next(error);
    }
};

exports.getStaffById = async (req, res, next) => {
    const { staffId } = req.params;

    if (!staffId || !mongoose.Types.ObjectId.isValid(staffId))
        return next(new ErrorResponse("Please provide valid staff's ID", 400));

    try {
        const staff = await Staff.findById(staffId);

        if (!staff)
            return next(new ErrorResponse("No staff found", 404));
        
        res.status(200).json({
            success: true,
            data: staff
        });
    } catch (error) {
        next(error);
    }
};

exports.updateStaff = async (req, res, next) => {

};