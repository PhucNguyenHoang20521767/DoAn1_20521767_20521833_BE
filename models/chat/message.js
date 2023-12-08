const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var messageSchema = new Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: [true, "Please provide conversation's ID"],
            trim: true
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Please provide sender's ID"],
            trim: true
        },
        messageText: {
            type: String,
            required: [true, "Please provide message content"],
            trim: true
        },
        messageSentDate: {
            type: Date,
            default: new Date()
        }
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - conversationId
 *         - senderId
 *         - messageText
 *       properties:
 *         conversationId:
 *           type: string
 *         senderId:
 *           type: string
 *         messageText:
 *           type: string
 *         messageSentDate:
 *           type: string
 */