const Customer = require("../../models/customer");
const ErrorResponse = require("../../utils/errorResponse");
const base32 = require("base32");
const { sendEmail } = require("../../config/sendEmail");

exports.registerCustomer = async (req, res, next) => {
    const { customerLoginName, customerPassword, customerFullName, customerBirthday, customerEmail, customerPhone, customerGender } = req.body;

    try {
        const customer = await Customer.create({
            customerLoginName,
            customerPassword,
            customerFullName,
            customerBirthday,
            customerEmail,
            customerPhone,
            customerGender
        });

        sendOTPToCustomerEmail(customer, 201, res);
    } catch (error) {
        next(error);
    }
};

exports.loginCustomer = async (req, res, next) => {
    const { customerEmail, customerPassword } = req.body;

    if (!customerEmail || !customerPassword)
        return next(ErrorResponse("Please provide email and password", 400));
    
    try {
        const customer = await Customer.findOne({
            customerEmail
        }).select("+customerPassword");
        
        if (!customer)
            return next(new ErrorResponse("Invalid credentials", 401));

        const passwordValid = await customer.checkPassword(customerPassword);
		if (!passwordValid)
            return next(new ErrorResponse("Incorrect password", 401));

        sendTokenCustomer(customer, 200, res);
    } catch (error) {
        next(error);
    }
};

exports.verifyCustomerAfterSendOTP = async (req, res, next) => {
    const { customerIdToken, customerOTP } = req.body;

    const customerId = base32.decode(customerIdToken);

    try {
        const customer = await Customer.findById(customerId).select("+verificationKey");

        if (!customer)
            return next(new ErrorResponse("No customer found", 404));

        if (!(await customer.verifyOTPFromEmail(customerOTP)))
            return next(new ErrorResponse("Invalid OTP", 401));

        await customer.verifyCustomer();
        sendTokenCustomer(customer, 200, res);
    } catch (error) {
        next(error);
    }
};

exports.forgetPasswordCustomer = async (req, res, next) => {

};

exports.resetPasswordCustomer = async (req, res, next) => {

};

const sendTokenCustomer = (customer, statusCode, res) => {
	res.status(statusCode).json({
		success: true,
		token: customer.getSignedTokenCustomer()
	});
};

const sendOTPToCustomerEmail = async (customer, statusCode, res) => {
    await sendEmail(
        customer.customerEmail,
        "Verify Your Email Address",
        `Hi ${customer.customerFullName}, please input this OTP code to verify your email address: ${await customer.getOTPToSend()}`
    );

    res.status(statusCode).json({
        success: true,
        customerIdToken: await customer.getBase32Id()
    });
};