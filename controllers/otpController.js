const User = require("../model/userSchema");

const otpController = async (req, res) => {
    let { email, otp } = req.body;

    let userOtp = await User.find({ email: email });
    if (userOtp[0].otp == otp) {
        await User.findOneAndUpdate(
            { email: email },
            { otp: "", verify: true }
        );
        res.send("Otp is match")
    } else {
        res.send("Otp is not match");
    }
};

module.exports = otpController;
