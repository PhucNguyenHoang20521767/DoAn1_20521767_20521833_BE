const Staff = require("../../models/staff");
const ErrorResponse = require("../../utils/errorResponse");

exports.registerAdmin = async (req, res, next) => {
    const { staffLoginName, staffPassword, staffFullName, staffEmail, staffPhone  } = req.body;

	try {
		const admin = await Staff.create(
            {
				staffLoginName,
				staffPassword,
				staffFullName,
				staffEmail,
				staffPhone,
				privilege: 0
			}
		);

		sendTokenAdmin(admin, 201, res);
	} catch (error) {
		next(error);
	}
};

exports.loginAdmin = async (req, res, next) => {
	const { staffLoginName, staffPassword } = req.body;

	if (!staffLoginName || !staffPassword)
		return next(ErrorResponse("Please provide login name and password", 400));

	try {
		const admin = await Staff.findOne({
			staffLoginName,
			privilege: 0
		}).select("+staffPassword");

		if (!admin) next(new ErrorResponse("Invalid credentials", 401));

		const passwordValid = await admin.checkPassword(staffPassword);
		if (!passwordValid)
            return next(new ErrorResponse("Incorrect password", 401));

		sendTokenAdmin(admin, 200, res);
	} catch (error) {
		next(error);
	}
};

exports.validateAdmin = async (req, res, next) => {
	if (req.admin)
		res.json({
			success: true,
			data: req.admin,
		});
	else {
		return next(ErrorResponse("No Admin found!", 404));
	}
};

const sendTokenAdmin = (staff, statusCode, res) => {
	res.status(statusCode).json({
		success: true,
		token: staff.getSignedTokenStaff("ADMIN")
	});
};