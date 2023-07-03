const express = require("express");
const router = express.Router();
const { protect, adminProtect } = require("../middleware/auth");

const { countNewCustomers, countNewOrdersOfMonth, getPercentGrowth, getImportTotalPriceOfMonth, getRevenueOfMonth, getRevenueOfLastMonth, getOrderPerMonth, getRevenuePerMonth } = require("../controllers/statisticController");

/**
 * @swagger
 * /api/statistics/countNewCustomers:
 *   get:
 *     tags: [Statistic]
 *     operatorId: countNewCustomers
 *     description: Count new customers
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Success
 */
router.route("/countNewCustomers").get(adminProtect, protect, countNewCustomers);

/**
 * @swagger
 * /api/statistics/countNewOrdersOfMonth:
 *   get:
 *     tags: [Statistic]
 *     operatorId: countNewOrdersOfMonth
 *     description: Count new orders of month
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Success
 */
router.route("/countNewOrdersOfMonth").get(adminProtect, protect, countNewOrdersOfMonth);

/**
 * @swagger
 * /api/statistics/getPercentGrowth:
 *   get:
 *     tags: [Statistic]
 *     operatorId: getPercentGrowth
 *     description: Get percent growth
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Success
 */
router.route("/getPercentGrowth").get(adminProtect, protect, getPercentGrowth);

/**
 * @swagger
 * /api/statistics/getImportTotalPriceOfMonth:
 *   get:
 *     tags: [Statistic]
 *     operatorId: getImportTotalPriceOfMonth
 *     description: Get import total price of month
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Success
 */
router.route("/getImportTotalPriceOfMonth").get(adminProtect, protect, getImportTotalPriceOfMonth);

/**
 * @swagger
 * /api/statistics/getRevenueOfMonth:
 *   get:
 *     tags: [Statistic]
 *     operatorId: getRevenueOfMonth
 *     description: Get revenue of month
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Success
 */
router.route("/getRevenueOfMonth").get(adminProtect, protect, getRevenueOfMonth);

/**
 * @swagger
 * /api/statistics/getRevenueOfLastMonth:
 *   get:
 *     tags: [Statistic]
 *     operatorId: getRevenueOfLastMonth
 *     description: Get revenue of last month
 *     security:
 *       - bearer: []
 *     responses:
 *       200:
 *         description: Success
 */
router.route("/getRevenueOfLastMonth").get(adminProtect, protect, getRevenueOfLastMonth);

/**
 * @swagger
 * /api/statistics/getOrderPerMonth/{year}:
 *   get:
 *     tags: [Statistic]
 *     operatorId: getOrderPerMonth
 *     description: Get order per month
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         type: number
 *         description: Year
 *     responses:
 *       200:
 *         description: Success
 */
router.route("/getOrderPerMonth/:year").get(adminProtect, protect, getOrderPerMonth);

/**
 * @swagger
 * /api/statistics/getRevenuePerMonth/{year}:
 *   get:
 *     tags: [Statistic]
 *     operatorId: getRevenuePerMonth
 *     description: Get revenue per month
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         type: number
 *         description: Year
 *     responses:
 *       200:
 *         description: Success
 */
router.route("/getRevenuePerMonth/:year").get(adminProtect, protect, getRevenuePerMonth);

module.exports = router;