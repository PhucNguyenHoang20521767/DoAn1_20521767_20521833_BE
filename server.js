const express = require("express");
const connectDb = require("./config/db");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");
const errorHandler = require("./middleware/error");

const app = express();
connectDb();

app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: swaggerDocument,
    apis: ["server.js", "./routes/*.js", "./middleware/*.js", "./models/*.js"]
}

app.get("/", function (req, res) {
	res.redirect("/docs");
});

app.use("/api/customers", require("./routes/customers"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/subcategories", require("./routes/subcategories"));

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