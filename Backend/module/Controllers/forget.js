let UserModel = require("../../model/User.model");
let Jwt = require("jsonwebtoken");
let nodemailer = require("nodemailer");
module.exports = async (req, res) => {
  try {
    let { email } = req.body;

    let Finduser = await UserModel.findOne({ Email: email });

    if (!Finduser) {
      return res.json({
        status: false,
        msg: "User not found!",
      });
    }
    let id = Finduser.id;
    let Token = await Jwt.sign(
      { email: Finduser.Email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    if (!Token) {
      res.json({
        status: false,
        msg: "invalid token",
      });
    }

    let Resetlink = `https://authentication-fmorlao36-srikanths-projects-8cc0fd19.vercel.app//reset-password/${id}/${Token}`;

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "p.srikanthsri4567@gmail.com",
        pass: "gzmi pavl fnkg sasr",
      },
    });

    var mailOptions = {
      from: "p.srikanthsri4567@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `Please click the following link to reset your password: ${Resetlink}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        return res.json({
          status: true,
          msg: "Reset password link has been sent to your email",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
