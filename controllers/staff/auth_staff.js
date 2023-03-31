const Staff = require("../../models/staff");
const ErrorResponse = require("../../utils/errorResponse");

exports.registerStaff = async (req, res, next) => {
    const { staffLoginName, staffPassword, staffFirstName, staffLastName, staffEmail, staffPhone, privilege  } = req.body;

	try {
		const staff = await Staff.create(
            {
				staffLoginName,
				staffPassword,
				staffFirstName,
				staffLastName,
				staffEmail,
				staffPhone,
				privilege
			}
		);

		sendTokenStaff(staff, 201, res);
	} catch (error) {
		next(error);
	}
};

exports.loginStaff = async (req, res, next) => {
	const { staffLoginName, staffPassword } = req.body;

	if (!staffLoginName || !staffPassword)
		return next(ErrorResponse("Please provide login name and password", 400));

	try {
		const staff = await Staff.findOne({
			staffLoginName,
			staffStatus: 0
		}).select("+staffPassword");

		if (!staff) next(new ErrorResponse("Invalid credentials", 401));

		const passwordValid = await staff.checkPassword(staffPassword);
		if (!passwordValid)
            return next(new ErrorResponse("Incorrect password", 401));

		sendTokenStaff(staff, 200, res);
	} catch (error) {
		next(error);
	}
};

const sendTokenStaff = (staff, statusCode, res) => {
	res.status(statusCode).json({
		success: true,
		token: staff.getSignedTokenStaff("STAFF")
	});
};