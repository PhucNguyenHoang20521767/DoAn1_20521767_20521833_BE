const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var addressSchema = new Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: [true, "Please provide customer's ID"],
            trim: true
        },
        receiverFirstName: {
            type: String,
            match: [
                /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
                "Invalid first name",
            ],
            required: [true, "Please provide receiver's first name"],
            trim: true
        },
        receiverLastName: {
            type: String,
            match: [
                /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
                "Invalid last name",
            ],
            required: [true, "Please provide receiver's last name"],
            trim: true
        },
        receiverPhone: {
            type: String,
            validate: [/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Invalid phone number"],
            required: [true, "Please provide receiver's phone number"]
        },
        receiverAddress: {
            type: String,
            required: [true, "Please provide receiver's address"],
            trim: true
        },
        receiverWard: {
            type: String,
            required: [true, "Please provide receiver's ward"],
            trim: true
        },
        receiverDistrict: {
            type: String,
            required: [true, "Please provide receiver's district"],
            trim: true
        },
        receiverCity: {
            type: String,
            required: [true, "Please provide receiver's city"],
            trim: true
        },
        isDefault: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       required:
 *         - customerId
 *         - receiverFirstName
 *         - receiverLastName
 *         - receiverPhone
 *         - receiverAddress
 *         - receiverWard
 *         - receiverDistrict
 *         - receiverCity
 *       properties:
 *         customerId:
 *           type: string
 *         receiverFirstName:
 *           type: string
 *         receiverLastName:
 *           type: string
 *         receiverPhone:
 *           type: string
 *         receiverAddress:
 *           type: string
 *         receiverWard:
 *           type: string
 *         receiverDistrict:
 *           type: string
 *         receiverCity:
 *           type: string
 *         isDefault:
 *           type: boolean
 */