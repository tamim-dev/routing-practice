const mongoose = require("mongoose");
let { USER_NAME, PASSWORD, DATABASE_NAME } = process.env;

function dbConnection() {
    mongoose
        .connect(
            `mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.cyb0k19.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`
        )
        .then(() => console.log("Connected!"));
}

module.exports = dbConnection;
