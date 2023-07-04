const express = require("express");
const router = express.Router();
const passport = require("passport");

// Google Authentication
router.route("/google/login/success").get((req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Logged In With Google",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.route("/google/login/failed").get((req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.route("/google").get(passport.authenticate("google", ["profile", "email"]));

router.route("/google/callback").get(
	passport.authenticate("google", {
		successRedirect: "https://do-an1-20521767-20521833.vercel.app/", // /api/auth/google/login/success
		failureRedirect: "/api/auth/google/login/failed",
	})
);

router.route("/google/logout").get((req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

// Facebook Authentication
router.route("/facebook/login/success").get((req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Logged In With Facebook",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.route("/facebook/login/failed").get((req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.route("/facebook").get(passport.authenticate("facebook", ["public_profile", "email"]));

router.route("/facebook/callback").get(
	passport.authenticate("facebook", {
		successRedirect: "/api/auth/facebook/login/success",
		failureRedirect: "/api/auth/facebook/login/failed",
	})
);

router.route("/facebook/logout").get((req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

module.exports = router;