const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGO_DB_CONFIG } = require("./config/app.config");
const error = require("./middleware/error.middleware");
const swaggerUi = require("swagger-ui-express"), swaggerDocument = require("./swagger.json");

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_DB_CONFIG.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(() => {
        console.log("Database Connected Successfully");
    },
    (error) => {
        console.log("Database Connection Failed" + error);
    });

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api", require("./routes/app.routes"));
app.use(error.errorHandler);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
});
