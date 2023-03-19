const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticator, totp } = require("otplib");
const base32 = require("base32");

var customerSchema = new Schema(
    {
        customerLoginName: {
            type: String,
            required: [true, "Please provide customer's name"],
            trim: true
        },
        customerPassword: {
            type: String,
            required: [true, "Please add a password"],
            minlength: [8, "Password must have at least 8 characters"],
            select: false,
            trim: true
        },
        customerFullName: {
            type: String,
            match: [
                /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
                "Invalid name",
            ],
            required: true,
            trim: true
        },
        customerBirthday: {
            type: Date
        },
        customerEmail: {
            type: String,
            required: [true, "Please provide customer's email"],
            unique: [true, "Email is already registered"],
            match: [
                /^[a-z0-9_\.]{1,32}@[a-z0-9]{2,10}(\.[a-z0-9]{2,10}){1,}$/,
                "Invalid email",
            ],
            trim: true
        },
        customerPhone: {
            type: String,
            validate: [/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Invalid phone number"],
            required: [true, "Please provide customer's phone number"],
            unique: [true, "Phone number is already registered"]
        },
        customerGender: {
            type: String,
            trim: true
        },
        customerAvatar: {
            type: String,
            default: "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg",
            trim: true
        },
        customerStatus: {
            type: Boolean,
            default: false
        },
        verificationKey: { type: String, select: false, trim: true },
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true}
);

// Encrypt password & generate verification key before save
customerSchema.pre("save", async function(next) {
    if (!this.isModified("customerPassword")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.customerPassword = await bcrypt.hash(this.customerPassword, salt);
    this.verificationKey = authenticator.generateSecret();
    next();
});

// Convert Id to Base32 format
customerSchema.methods.getBase32Id = async function () {
    return base32.encode(this._id.toString());
};

// Check password is correct
customerSchema.methods.checkPasswordCustomer = async function (customerPassword) {
    return await bcrypt.compare(customerPassword, this.customerPassword);
};

// Update new password
customerSchema.methods.updatePasswordCustomer = async function (customerPassword) {
    this.customerPassword = customerPassword;
    await this.save();
};

// Get JSON Web Token
customerSchema.methods.getSignedTokenCustomer = function () {
    return jwt.sign(
        { id: this._id, staff: false },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    );
};

// Generate OTP to send
customerSchema.methods.getOTPToSend = async function () {
    totp.options = {
      algorithm: "sha1",
      encoding: "ascii",
      digits: 6,
      epoch: Date.now(),
      step: 300,
      window: 300,
    };
    return totp.generate(this.verificationKey);
};

// Check OTP receive from email and verify customer
customerSchema.methods.verifyOTPFromEmail = async function (otp) {
    totp.options = {
      algorithm: "sha1",
      encoding: "ascii",
      digits: 6,
      epoch: Date.now(),
      step: 300,
      window: 300,
    };
    return totp.check(otp, this.verificationKey);
};

// Customer will be verified if OTP is correct
customerSchema.methods.verifyCustomer = async function () {
    this.isVerified = true;
    await this.save();
};

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - customerLoginName
 *         - customerPassword
 *         - customerFullName
 *         - customerEmail
 *         - customerPhone
 *       properties:
 *         customerLoginName:
 *           type: string
 *         customerPassword:
 *           type: string
 *         customerFullName:
 *           type: string
 *         customerBirthday:
 *           type: string
 *         customerEmail:
 *           type: string
 *         customerPhone:
 *           type: string
 *         customerGender:
 *           type: string
 *         customerAvatar:
 *           type: string
 *         customerStatus:
 *           type: boolean
 */