const express = require("express");
const connectDb = require("./config/db");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
connectDb();

app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: process.env.PROJECT_NAME,
            description: process.env.PROJECT_NAME + " API"
        },
    },
    apis: ["app.js", "./routes/*.js", "./model/*/*.js"]
}

app.use("/api/catchphrases", require("./routes/catchphrases"));

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

app.listen(process.env.PORT || 5000, () => console.log("Up and running 🚀"));