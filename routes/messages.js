const express = require("express");
const router = express.Router();
const { protect, staffAndAdminProtect } = require("../middleware/auth");

const { getAllMessagesForConversation, createMessage, deleteMessage } = require("../controllers/chat/messageController");

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

module.exports = router;