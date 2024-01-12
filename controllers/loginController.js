const bcrypt = require("bcrypt");
const User = require("../model/userSchema");

const loginController = async (req, res) => {
    let { email, password } = req.body;

    let existingUser = await User.find({ email: email });

    if (existingUser.length == 0) {
        res.send("Credential invalid");
    } else {
        if (existingUser[0].verify == false) {
            res.send("Please verify Email");
        } else {
            bcrypt.compare(
                password,
                existingUser[0].password,
                function (err, result) {
                    if (result == true) {
                        res.send("Login successful");
                    } else {
                        res.send("Incorrect password");
                    }
                }
            );
        }
    }
};

module.exports = loginController;
