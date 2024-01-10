const User = require("../model/userSchema");
const { passwordValidation } = require("../helpers/validation");

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
            if (!passwordValidation(password)) {
                return res.send(
                    "Enter an password 8 characters includes letter and number"
                );
            }

            let user = new User({
                name: name,
                email: email,
                password: password,
            });

            user.save();

            res.send(user);
        }
    } else {
        res.send("Email is already exist");
    }
};

module.exports = registrationController;
