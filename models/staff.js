const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var staffSchema = new Schema(
    {
        staffLoginName: {
            type: String,
            unique: [true, "Login name is already registered"],
            required: [true, "Please provide staff's name"],
            trim: true
        },
        staffPassword: {
            type: String,
            required: [true, "Please add a password"],
            minlength: [8, "Password must have at least 8 characters"],
            select: false,
            trim: true
        },
        staffFullName: {
            type: String,
            match: [
                /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
                "Invalid name",
            ],
            required: true,
            trim: true
        },
        staffEmail: {
            type: String,
            required: [true, "Please provide staff's email"],
            unique: [true, "Email is already registered"],
            match: [
                /^[a-z0-9_\.]{1,32}@@[a-z0-9]{2,10}(\.[a-z0-9]{2,10}){1,}$/,
                "Invalid email",
            ],
            trim: true
        },
        staffPhone: {
            type: String,
            validate: [/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Invalid phone number"],
            required: [true, "Please provide staff's phone number"],
            unique: [true, "Phone number is already registered"]
        },
        staffGender: {
            type: String,
            trim: true
        },
        staffStartWork: {
            type: Date
        },
        staffStatus: {
            type: Number,
            default: 0
        },
        privilege: {
            type: Number,
            required: true,
            default: 0
        }
    },
    { timestamps: true }
);

// Encrypt password before save
staffSchema.pre("save", async function(next) {
    if (!this.isModified("staffPassword")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.staffPassword = await bcrypt.hash(this.staffPassword, salt);
    next();
});

// Check password is correct
staffSchema.methods.checkPassword = async function (staffPassword) {
    return await bcrypt.compare(staffPassword, this.staffPassword);
};

// Get JSON Web Token
staffSchema.methods.getSignedTokenStaff = function (privilege) {
    return jwt.sign(
        { id: this._id, staff: true, privilege: privilege },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    );
};

const Staff = mongoose.model("Staff", staffSchema);
module.exports = Staff;

/**
 * @swagger
 * components:
 *   schemas:
 *     Staff:
 *       type: object
 *       required:
 *         - staffLoginName
 *         - staffPassword
 *         - staffFullName
 *         - staffEmail
 *         - staffPhone
 *         - privilege
 *       properties:
 *         staffLoginName:
 *           type: string
 *         staffPassword:
 *           type: number
 *         staffFullName:
 *           type: string
 *         staffEmail:
 *           type: string
 *         staffPhone:
 *           type: string
 *         staffGender:
 *           type: string
 *         staffStartWork:
 *           type: date
 *         staffStatus:
 *           type: number
 *         privilege:
 *           type: number
 */