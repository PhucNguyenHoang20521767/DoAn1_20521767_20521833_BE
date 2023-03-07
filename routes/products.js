// const express = require("express");
// const router = express.Router();
// const { protect, adminProtect } = require("../middleware/auth");
// const { query } = require("../middleware/query");

// const { getAllProducts, createProduct } = require("../controllers/productController");

// /**
//  * @swagger
//  * /api/products/getAllProducts:
//  *   get:
//  *     tags: [Product]
//  *     operatorId: getAllProducts
//  *     description: All products
//  *     responses:
//  *       200:
//  *         description: Returns all the products
//  */
// router.route("/getAllProducts").get(query, getAllProducts);

// /**
//  * @swagger
//  * /api/products/createProduct:
//  *   post:
//  *     tags: [Product]
//  *     operatorId: createProduct
//  *     security:
//  *      - bearer: []
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *          schema:
//  *            $ref: '#/components/schemas/Product'
//  *     responses:
//  *       201:
//  *         description: Created
//  *       400:
//  *         description: Bad Request
//  *       401:
//  *         description: Unauthorized
//  */
// router.route("/createProduct").post(adminProtect, protect, createProduct);

// module.exports = router;