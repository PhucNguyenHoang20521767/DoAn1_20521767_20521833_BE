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
	res.redirect("/doc");
});

app.use("/api/catchphrases", require("./routes/catchphrases"));

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

// Error Handler
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => console.log("Up and running 🚀"));