const express = require("express");
const router = express.Router();
const { protect, staffAndAdminProtect } = require("../middleware/auth");

const { getAllOrders, getAllOrdersForCustomer, getOrderById, createOrder, updateOrder, deleteOrder,
        getAllOrderItems, getOrderItemsForOrder, getOrderItemById, createOrderItem, updateOrderItem, deleteOrderItem } = require("../controllers/orderController");

/**
 * @swagger
 * /api/orders/getAllOrders:
 *   get:
 *     tags: [Order]
 *     operatorId: getAllOrders
 *     description: Get all orders
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllOrders").get(staffAndAdminProtect, protect, getAllOrders);

/**
 * @swagger
 * /api/orders/getAllOrdersForCustomer:
 *   get:
 *     tags: [Order]
 *     operatorId: getAllOrdersForCustomer
 *     description: Get all orders for customer
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 */
router.route("/getAllOrdersForCustomer").get(protect, getAllOrdersForCustomer);


/**
 * @swagger
 * /api/orders/getOrderById/{id}:
 *   get:
 *     tags: [Order]
 *     operatorId: getOrderById
 *     description: Get order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/getOrderById/:orderId").get(getOrderById);

/**
 * @swagger
 * /api/orders/createOrder:
 *   post:
 *     tags: [Order]
 *     operatorId: createOrder
 *     description: Create new order
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
 *               orderCode:
 *                 type: string
 *               orderStatus:
 *                 type: string
 *               orderNote:
 *                 type: string
 *               orderAddress:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *               orderShippingFee:
 *                 type: number
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.route("/createOrder").post(protect, createOrder);

/**
 * @swagger
 * /api/orders/updateOrder/{id}:
 *   put:
 *     tags: [Order]
 *     operatorId: updateOrder
 *     description: Update order
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               customerId:
 *                 type: string
 *               staffId:
 *                 type: string
 *               orderCode:
 *                 type: string
 *               orderStatus:
 *                 type: string
 *               orderNote:
 *                 type: string
 *               orderAddress:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *               orderShippingFee:
 *                 type: number
 *               orderCompleteDay:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/updateOrder/:orderId").put(staffAndAdminProtect, protect, updateOrder);

/**
 * @swagger
 * /api/orders/deleteOrder/{id}:
 *   delete:
 *     tags: [Order]
 *     operatorId: deleteOrder
 *     description: Delete order
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Deleted
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/deleteOrder/:orderId").delete(staffAndAdminProtect, protect, deleteOrder);

/**
 * @swagger
 * /api/orders/getAllOrderItems:
 *   get:
 *     tags: [Order Item]
 *     operatorId: getAllOrderItems
 *     description: Get all order items
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllOrderItems").get(staffAndAdminProtect, protect, getAllOrderItems);

/**
 * @swagger
 * /api/orders/getOrderItemsForOrder/{id}:
 *   get:
 *     tags: [Order Item]
 *     operatorId: getOrderItemsForOrder
 *     description: Get items for order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/getOrderItemsForOrder/:orderId").get(getOrderItemsForOrder);


/**
 * @swagger
 * /api/orders/getOrderItemById/{id}:
 *   get:
 *     tags: [Order Item]
 *     operatorId: getOrderItemById
 *     description: Get order item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Order item ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/getOrderItemById/:orderItemId").get(getOrderItemById);

/**
 * @swagger
 * /api/orders/createOrderItem:
 *   post:
 *     tags: [Order Item]
 *     operatorId: createOrderItem
 *     description: Create new order item
 *     security:
 *       - bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               orderId:
 *                 type: string
 *               productId:
 *                 type: string
 *               productQuantity:
 *                 type: number
 *               productPrice:
 *                 type: number
 *               productSalePrice:
 *                 type: number
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.route("/createOrderItem").post(protect, createOrderItem);

/**
 * @swagger
 * /api/orders/updateOrderItem/{id}:
 *   put:
 *     tags: [Order Item]
 *     operatorId: updateOrderItem
 *     description: Update order item
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Order item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               orderId:
 *                 type: string
 *               productId:
 *                 type: string
 *               productQuantity:
 *                 type: number
 *               productPrice:
 *                 type: number
 *               productSalePrice:
 *                 type: number
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/updateOrderItem/:orderItemId").put(staffAndAdminProtect, protect, updateOrderItem);

/**
 * @swagger
 * /api/orders/deleteOrderItem/{id}:
 *   delete:
 *     tags: [Order Item]
 *     operatorId: deleteOrderItem
 *     description: Delete order item
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Order item ID
 *     responses:
 *       200:
 *         description: Deleted
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/deleteOrderItem/:orderItemId").delete(staffAndAdminProtect, protect, deleteOrderItem);

module.exports = router;