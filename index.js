require("dotenv").config();
const express = require("express");
const app = express();
const dbConnection = require("./config/dbConfig");
const router = require("./routes/index");

dbConnection();
app.use(express.json());
app.use(router);

app.listen(8000, function () {
    console.log("server is running");
});
