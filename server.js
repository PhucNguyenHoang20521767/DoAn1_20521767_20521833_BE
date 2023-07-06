const express = require("express");
const connectDb = require("./config/db");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");
const errorHandler = require("./middleware/error");
const cookieSession = require("cookie-session");
const cors = require("cors");
const passport = require("passport");
const passportGoogleStrategy = require("./passport_google");
const passportFacebookStrategy = require("./passport_facebook");

const app = express();
connectDb();

app.use(
	cookieSession({
		name: "session",
		keys: ["nguyenshomefurniture"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(cors({ origin: process.env.CLIENT_ORIGIN_URL }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use("/", (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

app.use("/api/auth/google/login/success", (req, res, next) => {
	res.header("Access-Control-Allow-Origin", process.env.CLIENT_ORIGIN_URL);
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

const swaggerOptions = {
    swaggerDefinition: swaggerDocument,
    apis: ["server.js", "./routes/*.js", "./middleware/*.js", "./models/*.js"]
}

app.get("/", function (req, res) {
	res.redirect("/docs");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/staffs", require("./routes/staffs"));
app.use("/api/customers", require("./routes/customers"));
app.use("/api/addresses", require("./routes/addresses"));
app.use("/api/carts", require("./routes/carts"));
app.use("/api/feedbacks", require("./routes/feedbacks"));

app.use("/api/campaigns", require("./routes/campaigns"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/products", require("./routes/products"));
app.use("/api/imports", require("./routes/imports"));
app.use("/api/discounts", require("./routes/discounts"));
app.use("/api/payments", require("./routes/payments"));
app.use("/api/suppliers", require("./routes/suppliers"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/subcategories", require("./routes/subcategories"));
app.use("/api/wishlist", require("./routes/wishlist"));
app.use("/api/attachments", require("./routes/attachments"));
app.use("/api/attachments", require("./routes/attachments"));
app.use("/api/colors", require("./routes/colors"));
app.use("/api/statistics", require("./routes/statistics"));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

// Authentication
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearer:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// Error Handler
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => console.log("Up and running 🚀"));