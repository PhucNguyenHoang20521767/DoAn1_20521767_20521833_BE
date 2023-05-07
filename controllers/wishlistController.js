const mongoose = require("mongoose");
const Wishlist = require("../models/wishlist");
const ErrorResponse = require("../utils/errorResponse");

exports.getCustomerWishlist = async (req, res, next) => {
    let options = { customerId: req.user._id };

    let total = Wishlist.countDocuments(options);
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || parseInt(await total);
    let last_page = Math.ceil(parseInt(await total)/limit);
    if (last_page < 1 && total > 0) {
        last_page = 1
    }

    try {
        const wishlist = await Wishlist.find(options);
        res.status(200).json({
            success: true,
            message: "Wishlist fetched successfully",
            data: wishlist,
            total: (await total).toString(),
            page: (await page).toString(),
            last_page: (await last_page).toString()
        });
    } catch (error) {
        next(error);
    }
};

exports.addOrRemoveProductFromWishlist = async (req, res, next) => {
    const customer = req.user;
	const { productId } = req.params;

	if (!productId || !mongoose.Types.ObjectId.isValid(productId))
		return next(new ErrorResponse("Please provide valid product's ID", 400));

	try {
		const wishlist = await Wishlist.findOneAndDelete({
			productId: productId,
			customerId: customer._id
		});

		if (!wishlist)
			await Wishlist.create({
				productId: productId,
			    customerId: customer._id
			});

		res.status(200).json({
			success: true,
			message: `Product ${!wishlist ? "added to" : "removed from"} wishlist successfully`,
		});
	} catch (error) {
		next(error);
	}
};