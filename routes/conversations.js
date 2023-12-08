const express = require("express");
const router = express.Router();
const { query } = require("../middleware/query");
const { protect, staffAndAdminProtect, adminProtect } = require("../middleware/auth");

const { getAllConversations, getConversationById, createConversation, deleteConversation,
        getUserConversation, createConversationForCustomer }  = require("../controllers/chat/conversationController");

/**
 * @swagger
 * /api/conversations/getAllConversations:
 *   get:
 *     tags: [Conversation]
 *     operatorId: getAllConversations
 *     description: Get all conversations
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: query
 *         name: search
 *         type: string
 *       - in: query
 *         name: page
 *         type: string
 *         description: Specify page number
 *       - in: query
 *         name: limit
 *         type: string
 *         description: Limit the number of rows returned from a query
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllConversations").get(staffAndAdminProtect, protect, query, getAllConversations);

/**
 * @swagger
 * /api/conversations/getConversationById/{id}:
 *   get:
 *     tags: [Conversation]
 *     operatorId: getConversationById
 *     description: Get conversation by ID
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
 *       404:
 *         description: Not Found
 */
router.route("/getConversationById/:conversationId").get(staffAndAdminProtect, protect, getConversationById);

/**
 * @swagger
 * /api/conversations/createConversation:
 *   post:
 *     tags: [Conversation]
 *     operatorId: createConversation
 *     description: Create conversation
 *     security:
 *       - bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               customerId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.route("/createConversation").post(staffAndAdminProtect, protect, createConversation);

/**
 * @swagger
 * /api/conversations/deleteConversation/{id}:
 *   delete:
 *     tags: [Conversation]
 *     operatorId: deleteConversation
 *     description: Delete conversation
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
 *       404:
 *         description: Not Found
 */
router.route("/deleteConversation/:conversationId").delete(adminProtect, protect, deleteConversation);

/**
 * @swagger
 * /api/conversations/getUserConversation:
 *   get:
 *     tags: [Conversation]
 *     operatorId: getUserConversation
 *     description: Get conversation of user
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 */
router.route("/getUserConversation").get(protect, getUserConversation);

/**
 * @swagger
 * /api/conversations/createConversationForCustomer:
 *   post:
 *     tags: [Conversation]
 *     operatorId: createConversationForCustomer
 *     description: Create conversation for customer
 *     security:
 *       - bearer: []
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.route("/createConversationForCustomer").post(protect, createConversationForCustomer);

module.exports = router;