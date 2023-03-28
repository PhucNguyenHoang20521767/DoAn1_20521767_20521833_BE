const Staff = require("../../models/staff");
const ErrorResponse = require("../../utils/errorResponse");

exports.registerAdmin = async (req, res, next) => {
    const { staffLoginName, staffPassword, staffFullName, staffEmail, staffPhone, staffGender  } = req.body;

	try {
		const admin = await Staff.create(
            {
				staffLoginName,
				staffPassword,
				staffFullName,
				staffEmail,
				staffPhone,
				staffGender,
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
			staffStatus: 0,
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

const sendTokenAdmin = (staff, statusCode, res) => {
	res.status(statusCode).json({
		success: true,
		token: staff.getSignedTokenStaff("ADMIN")
	});
};