const express = require("express");
const router = express.Router();
const passport = require("passport");

router.route("/login/success").get((req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Logged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.route("/login/failed").get((req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.route("/google").get(passport.authenticate("google", ["profile", "email"]));

router.route("/google/callback").get(
	passport.authenticate("google", {
		successRedirect: process.env.GOOGLE_CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

router.route("/logout").get((req, res) => {
	req.logout();
	res.redirect(process.env.GOOGLE_CLIENT_URL);
});

module.exports = router;