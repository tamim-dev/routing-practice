const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const {
    passwordValidation,
    emailValidation,
} = require("../helpers/validation");

let registrationController = async (req, res) => {
    let { name, email, password } = req.body;

    let existingemail = await User.find({ email: email });

    if (existingemail.length == 0) {
        if (!name) {
            res.send("Name required");
        } else if (!email) {
            res.send("Email required");
        } else if (!password) {
            res.send("Password required");
        } else {
            if (!emailValidation(email)) {
                return res.send("Valid Email Required");
            }
            if (!passwordValidation(password)) {
                return res.send(
                    "Enter an password 8 characters includes letter and number"
                );
            }

            bcrypt.hash(password, 10, function (err, hash) {
                let user = new User({
                    name: name,
                    email: email,
                    password: hash,
                });

                user.save();

                res.send(user);
            });
        }
    } else {
        res.send("Email is already exist");
    }
};

module.exports = registrationController;
