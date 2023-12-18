const express = require("express");
const router = express.Router();
const { protect, staffAndAdminProtect } = require("../middleware/auth");

const { getAllMessagesForConversation, getLastMessageForConversation, getNumberOfUnreadMessages, createMessage, deleteMessage, markAllMessagesAsRead } = require("../controllers/chat/messageController");

/**
 * @swagger
 * /api/messages/getAllMessagesForConversation/{id}:
 *   get:
 *     tags: [Message]
 *     operatorId: getAllMessagesForConversation
 *     description: Get all messages for conversation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Conversation ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllMessagesForConversation/:conversationId").get(getAllMessagesForConversation);

/**
 * @swagger
 * /api/messages/getLastMessageForConversation/{id}:
 *   get:
 *     tags: [Message]
 *     operatorId: getLastMessageForConversation
 *     description: Get last message for conversation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Conversation ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getLastMessageForConversation/:conversationId").get(getLastMessageForConversation);

/**
 * @swagger
 * /api/messages/getNumberOfUnreadMessages/{id}/{senderId}:
 *   get:
 *     tags: [Message]
 *     operatorId: getNumberOfUnreadMessages
 *     description: Get number of unread messages for conversation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Conversation ID
 *       - in: path
 *         name: senderId
 *         required: true
 *         type: string
 *         description: Sender ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getNumberOfUnreadMessages/:conversationId/:senderId").get(getNumberOfUnreadMessages);

/**
 * @swagger
 * /api/messages/createMessage:
 *   post:
 *     tags: [Message]
 *     operatorId: createMessage
 *     description: Create message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               conversationId:
 *                 type: string
 *               senderId:
 *                 type: string
 *               messageText:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.route("/createMessage").post(createMessage);

/**
 * @swagger
 * /api/messages/deleteMessage/{id}:
 *   delete:
 *     tags: [Message]
 *     operatorId: deleteMessage
 *     description: Delete message
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Message ID
 *     responses:
 *       200:
 *         description: Deleted
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/deleteMessage/:messageId").delete(staffAndAdminProtect, protect, deleteMessage);

/**
 * @swagger
 * /api/messages/markAllMessagesAsRead/{id}:
 *   put:
 *     tags: [Message]
 *     operatorId: markAllMessagesAsRead
 *     description: Mark all messages as read
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Conversation ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/markAllMessagesAsRead/:conversationId").put(staffAndAdminProtect, protect, markAllMessagesAsRead);

module.exports = router;