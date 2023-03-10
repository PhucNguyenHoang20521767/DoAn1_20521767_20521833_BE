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

app.use("/api/products", require("./routes/products"));
app.use("/api/categories", require("./routes/categories"));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

// Error Handler
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => console.log("Up and running 🚀"));