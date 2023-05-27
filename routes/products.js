const express = require("express");
const router = express.Router();

const { uploadMemoryStorage } = require("../config/attachment");
const { protect, staffAndAdminProtect, adminProtect } = require("../middleware/auth");
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, activeOrInactiveProduct,
    getAllProductImages, getAllProductImagesByColor, saveProductImage, deleteProductImage, deleteProductImagesByColor,
    getAllProductColors, addProductColor, updateProductColor, deleteProductColor,
    getProductDimension, addProductDimension, updateProductDimension, deleteProductDimension } = require("../controllers/productController");

const firebaseStorage = require("../config/firebase");
const { ref, uploadBytesResumable } = require("firebase/storage");

/**
 * @swagger
 * /api/products/getAllProducts:
 *   get:
 *     tags: [Product]
 *     operatorId: getAllProducts
 *     description: Get all products
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllProducts").get(getAllProducts);

/**
 * @swagger
 * /api/products/getProductById/{id}:
 *   get:
 *     tags: [Product]
 *     operatorId: getProductById
 *     description: Get product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/getProductById/:productId").get(getProductById);

/**
 * @swagger
 * /api/products/createProduct:
 *   post:
 *     tags: [Product]
 *     operatorId: createProduct
 *     description: Create product
 *     security:
 *       - bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               productName:
 *                 type: string
 *               productDescription:
 *                 type: string
 *               productPrice:
 *                 type: number
 *               productCategoryId:
 *                 type: string
 *               productSubcategoryId:
 *                 type: string
 *               productSupplierId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/createProduct").post(staffAndAdminProtect, protect, createProduct);

/**
 * @swagger
 * /api/products/updateProduct/{id}:
 *   put:
 *     tags: [Product]
 *     operatorId: updateProduct
 *     description: Update product by ID
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               productName:
 *                 type: string
 *               productDescription:
 *                 type: string
 *               productPrice:
 *                 type: number
 *               productCategoryId:
 *                 type: string
 *               productSubcategoryId:
 *                 type: string
 *               productSupplierId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/updateProduct/:productId").put(staffAndAdminProtect, protect, updateProduct);

/**
 * @swagger
 * /api/products/deleteProduct/{id}:
 *   delete:
 *     tags: [Product]
 *     operatorId: deleteProduct
 *     description: Delete product by ID
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/deleteProduct/:productId").delete(staffAndAdminProtect, protect, deleteProduct);

/**
 * @swagger
 * /api/products/activeOrInactiveProduct/{id}:
 *   put:
 *     tags: [Product]
 *     operatorId: activeOrInactiveProduct
 *     description: Active or inactive product by ID
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/activeOrInactiveProduct/:productId").put(staffAndAdminProtect, protect, activeOrInactiveProduct);

/**
 * @swagger
 * /api/products/getAllProductImages/{id}:
 *   get:
 *     tags: [Product Image]
 *     operatorId: getAllProductImages
 *     description: Get all product images
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllProductImages/:productId").get(getAllProductImages);

/**
 * @swagger
 * /api/products/getAllProductImagesByColor/{id}/{colorId}:
 *   get:
 *     tags: [Product Image]
 *     operatorId: getAllProductImagesByColor
 *     description: Get all product images by color
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product ID
 *       - in: path
 *         name: colorId
 *         required: true
 *         type: string
 *         description: Product Color ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllProductImagesByColor/:productId/:productColorId").get(getAllProductImagesByColor);

/**
 * @swagger
 * /api/products/saveProductImage/{id}:
 *   post:
 *     tags: [Product Image]
 *     operatorId: saveProductImage
 *     description: Save product image
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - productColorId
 *               - Files[]
 *             properties:
 *               productColorId:
 *                 type: string
 *               Files[]:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Upload Successful
 *       400:
 *         description: Not Found
 */
router.route("/saveProductImage/:productId").post(staffAndAdminProtect, protect, uploadMemoryStorage.array("Files[]"), async (req, res, next) => {
    try {
        if (req.files) {
            req.files.forEach((file) => {
                file.originalname = "product_" + file.originalname + "_" + Date.now();
                uploadBytesResumable(ref(firebaseStorage, `attachments/${file.originalname}`), file.buffer, { contentType: file.mimetype});
            });
        }
        next();
    } catch (error) {
        next(error);
    }
}, saveProductImage);

/**
 * @swagger
 * /api/products/deleteProductImage/{id}:
 *   delete:
 *     tags: [Product Image]
 *     operatorId: deleteProductImage
 *     description: Delete product image
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product Image ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/deleteProductImage/:productImageId").delete(staffAndAdminProtect, protect, deleteProductImage);

/**
 * @swagger
 * /api/products/deleteProductImagesByColor/{id}:
 *   delete:
 *     tags: [Product Image]
 *     operatorId: deleteProductImagesByColor
 *     description: Delete product images by color
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product Color ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/deleteProductImagesByColor/:productColorId").delete(staffAndAdminProtect, protect, deleteProductImagesByColor);

/**
 * @swagger
 * /api/products/getAllProductColors/{id}:
 *   get:
 *     tags: [Product Color]
 *     operatorId: getAllProductColors
 *     description: Get all product colors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllProductColors/:productId").get(getAllProductColors);

/**
 * @swagger
 * /api/products/addProductColor/{id}:
 *   post:
 *     tags: [Product Color]
 *     operatorId: addProductColor
 *     description: Add product color
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               colorId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Add Successful
 *       400:
 *         description: Bad Request
 */
router.route("/addProductColor/:productId").post(staffAndAdminProtect, protect, addProductColor);

/**
 * @swagger
 * /api/products/updateProductColor/{id}:
 *   put:
 *     tags: [Product Color]
 *     operatorId: updateProductColor
 *     description: Update product color
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product Color ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               colorId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Add Successful
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/updateProductColor/:productColorId").put(staffAndAdminProtect, protect, updateProductColor);

/**
 * @swagger
 * /api/products/deleteProductColor/{id}:
 *   delete:
 *     tags: [Product Color]
 *     operatorId: deleteProductColor
 *     description: Delete product color
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product Color ID
 *     responses:
 *       201:
 *         description: Add Successful
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/deleteProductColor/:productColorId").delete(staffAndAdminProtect, protect, deleteProductColor);

/**
 * @swagger
 * /api/products/getProductDimension/{id}:
 *   get:
 *     tags: [Product Dimension]
 *     operatorId: getProductDimension
 *     description: Get product dimension
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getProductDimension/:productId").get(getProductDimension);

/**
 * @swagger
 * /api/products/addProductDimension/{id}:
 *   post:
 *     tags: [Product Dimension]
 *     operatorId: addProductDimension
 *     description: Add product dimension
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               productLength:
 *                 type: number
 *               productWidth:
 *                 type: number
 *               productHeight:
 *                 type: number
 *               productWeight:
 *                 type: number
 *     responses:
 *       201:
 *         description: Add Successful
 *       400:
 *         description: Bad Request
 */
router.route("/addProductDimension/:productId").post(staffAndAdminProtect, protect, addProductDimension);

/**
 * @swagger
 * /api/products/updateProductDimension/{id}:
 *   put:
 *     tags: [Product Dimension]
 *     operatorId: updateProductDimension
 *     description: Update product dimension
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product Dimension ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               productLength:
 *                 type: number
 *               productWidth:
 *                 type: number
 *               productHeight:
 *                 type: number
 *               productWeight:
 *                 type: number
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/updateProductDimension/:productDimensionId").put(staffAndAdminProtect, protect, updateProductDimension);

/**
 * @swagger
 * /api/products/deleteProductDimension/{id}:
 *   delete:
 *     tags: [Product Dimension]
 *     operatorId: deleteProductDimension
 *     description: Delete product dimension
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product Dimension ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/deleteProductDimension/:productDimensionId").delete(staffAndAdminProtect, protect, deleteProductDimension);


module.exports = router;