const moment = require("moment");
const request = require("request");
const express = require("express");
const router = express.Router();
const { protect, adminProtect } = require("../middleware/auth");
const ErrorResponse = require("../utils/errorResponse");

const { getAllPayments, getPaymentById, createPayment, updatePayment, deletePayment, activeOrInactivePayment } = require("../controllers/paymentController");

// VNPay Payment
router.route("/createVNPayURL").post((req, res, next) => {
    let date = new Date();
    let createDate = moment(date).format("YYYYMMDDHHmmss");

    let ipAddress = req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let tmnCode = process.env.VNPAY_TMN_CODE;
    let secretKey = process.env.VNPAY_HASH_SECRET;
    let vnpUrl = process.env.VNPAY_URL;
    let returnUrl = process.env.VNPAY_RETURN_URL;
    let orderId = moment(date).format("HHmmss");
    let amount = req.body.amount;
    let bankCode = req.body.bankCode;

    let locale = req.body.language;
    if (locale === null || locale === "") {
        locale = "vn";
    }
    let currCode = "VND";
    let vnpParams = {};

    vnpParams["vnp_Version"] = "2.1.0";
    vnpParams["vnp_Command"] = "pay";
    vnpParams["vnp_TmnCode"] = tmnCode;
    vnpParams["vnp_Locale"] = locale;
    vnpParams["vnp_CurrCode"] = currCode;
    vnpParams["vnp_TxnRef"] = orderId;
    vnpParams["vnp_OrderInfo"] = "Thanh toan cho ma GD: " + orderId;
    vnpParams["vnp_OrderType"] = "other";
    vnpParams["vnp_Amount"] = amount * 100;
    vnpParams["vnp_ReturnUrl"] = returnUrl;
    vnpParams["vnp_IpAddr"] = ipAddress;
    vnpParams["vnp_CreateDate"] = createDate;

    if (bankCode !== null && bankCode !== "") {
        vnpParams["vnp_BankCode"] = bankCode;
    }

    vnpParams = sortObject(vnpParams);

    let querystring = require("qs");
    let signData = querystring.stringify(vnpParams, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    vnpParams["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnpParams, { encode: false });

    // res.redirect(vnpUrl);

    res.status(200).json({
        success: true,
        paymentURL: vnpUrl
    });
});

router.route("/getVNPayReturn").get((req, res, next) => {
    let vnpParams = req.query;

    let secureHash = vnpParams["vnp_SecureHash"];

    delete vnpParams["vnp_SecureHash"];
    delete vnpParams["vnp_SecureHashType"];

    vnpParams = sortObject(vnpParams);

    let secretKey = process.env.VNPAY_HASH_SECRET;

    let querystring = require("qs");
    let signData = querystring.stringify(vnpParams, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
        res.status(200).json({
            success: true,
            responseCode: vnpParams["vnp_ResponseCode"]
        });
    } else
        return next(new ErrorResponse("Invalid signature", 400));
});

router.route("/refundVNPay").post((req, res, next) => {
    let date = new Date();
    let crypto = require("crypto");

    let tmnCode = process.env.VNPAY_TMN_CODE;
    let secretKey = process.env.VNPAY_HASH_SECRET;
    let vnpApi = process.env.VNPAY_API;

    let vnpTxnRef = req.body.orderId;
    let vnpTransactionDate = req.body.transactionDate;
    let vnpAmount = req.body.amount * 100;
    let vnpTransactionType = req.body.transactionType;
    let vnpCreateBy = req.body.user

    let vnpRequestId = moment(date).format('HHmmss');
    let vnpVersion = '2.1.0';
    let vnpCommand = 'refund';
    let vnpOrderInfo = 'Hoan tien cho ma GD: ' + vnpTxnRef;

    let vnpIpAddress = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let vnpCreateDate = moment(date).format('YYYYMMDDHHmmss');

    let vnpTransactionNo = '0';

    let data = vnpRequestId + "|" + vnpVersion + "|" + vnpCommand + "|" + tmnCode + "|" + vnpTransactionType + "|" + vnpTxnRef + "|" + vnpAmount + "|" + vnpTransactionNo + "|" + vnpTransactionDate + "|" + vnpCreateBy + "|" + vnpCreateDate + "|" + vnpIpAddress + "|" + vnpOrderInfo;
    let hmac = crypto.createHmac("sha512", secretKey);
    let vnpSecureHash = hmac.update(Buffer.from(data, "utf-8")).digest("hex");

    let dataObj = {
        'vnp_RequestId': vnpRequestId,
        'vnp_Version': vnpVersion,
        'vnp_Command': vnpCommand,
        'vnp_TmnCode': tmnCode,
        'vnp_TransactionType': vnpTransactionType,
        'vnp_TxnRef': vnpTxnRef,
        'vnp_Amount': vnpAmount,
        'vnp_TransactionNo': vnpTransactionNo,
        'vnp_CreateBy': vnpCreateBy,
        'vnp_OrderInfo': vnpOrderInfo,
        'vnp_TransactionDate': vnpTransactionDate,
        'vnp_CreateDate': vnpCreateDate,
        'vnp_IpAddr': vnpIpAddress,
        'vnp_SecureHash': vnpSecureHash
    };

    request({
        url: vnpApi,
        method: "POST",
        json: true,
        body: dataObj
    }, (error, response, body) => {
        res.status(200).json({
            response: response
        });
    });
});

/**
 * @swagger
 * /api/payments/getAllPayments:
 *   get:
 *     tags: [Payment]
 *     operatorId: getAllPayments
 *     description: Get all payments
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllPayments").get(getAllPayments);

/**
 * @swagger
 * /api/payments/getPaymentById/{id}:
 *   get:
 *     tags: [Payment]
 *     operatorId: getPaymentById
 *     description: Get payment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/getPaymentById/:paymentId").get(getPaymentById);

/**
 * @swagger
 * /api/payments/createPayment:
 *   post:
 *     tags: [Payment]
 *     operatorId: createPayment
 *     description: Create new payment
 *     security:
 *       - bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               paymentType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.route("/createPayment").post(adminProtect, protect, createPayment);

/**
 * @swagger
 * /api/payments/updatePayment/{id}:
 *   put:
 *     tags: [Payment]
 *     operatorId: updatePayment
 *     description: Update payment
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Payment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               paymentType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/updatePayment/:paymentId").put(adminProtect, protect, updatePayment);

/**
 * @swagger
 * /api/payments/deletePayment/{id}:
 *   delete:
 *     tags: [Payment]
 *     operatorId: deletePayment
 *     description: Delete payment
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Deleted
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/deletePayment/:paymentId").delete(adminProtect, protect, deletePayment);

/**
 * @swagger
 * /api/payments/activeOrInactivePayment/{id}:
 *   put:
 *     tags: [Payment]
 *     operatorId: activeOrInactivePayment
 *     description: Active or inactive payment by ID
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/activeOrInactivePayment/:paymentId").put(adminProtect, protect, activeOrInactivePayment);

const sortObject = (obj) => {
	let sorted = {};
	let str = [];
	let key;

	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		    str.push(encodeURIComponent(key));
		}
	}

	str.sort();

    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }

    return sorted;
}

module.exports = router;