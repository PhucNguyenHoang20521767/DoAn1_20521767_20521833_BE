const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FACEBOOK_APP_ID,
			clientSecret: process.env.FACEBOOK_APP_SECRET,
			callbackURL: "/api/auth/facebook/callback",
			profileFields: ["id", "displayName", "picture.type(large)", "email", "birthday", "friends", "first_name", "last_name", "middle_name", "gender", "link"]
 	 	},
		function(accessToken, refreshToken, profile, done) {
			return done(null, profile);
		}
	)
);