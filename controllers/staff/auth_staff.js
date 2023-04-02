const Staff = require("../../models/staff");
const ErrorResponse = require("../../utils/errorResponse");

exports.registerStaff = async (req, res, next) => {
    const { staffPassword, staffFirstName, staffLastName, staffEmail, staffPhone, staffGender, privilege  } = req.body;

	try {
		const staff = await Staff.create(
            {
				staffPassword,
				staffFirstName,
				staffLastName,
				staffEmail,
				staffPhone,
				staffGender,
				privilege
			}
		);

		sendTokenStaff(staff, 201, res);
	} catch (error) {
		next(error);
	}
};

exports.loginStaff = async (req, res, next) => {
	const { staffEmail, staffPassword } = req.body;

	if (!staffEmail || !staffPassword)
		return next(ErrorResponse("Please provide email and password", 400));

	try {
		const staff = await Staff.findOne({
			staffEmail,
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