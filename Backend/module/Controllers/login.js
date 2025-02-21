let UserModel = require("../../model/User.model");
let bcrypt = require("bcrypt");
let Jwt = require("jsonwebtoken");
module.exports = async (req, res) => {
  try {
    let { email, password } = req.body;

    let Existuser = await UserModel.findOne({ Email: email });

    if (!Existuser) {
      return res.json({
        status: false,
        msg: "User not found!",
      });
    }

    let Ismatchpwd = await bcrypt.compare(password, Existuser.Password);

    if (!Ismatchpwd) {
      return res.json({
        status: false,
        msg: "incorrect password!",
      });
    }

    let Token = await Jwt.sign(
      { id: Existuser.id, role: Existuser.Role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", Token, {
      httponly: true,
      secure: false,
      maxAge: 3600000,
    });
    res.cookie("username", Existuser.Name, {
      httponly: false,
      secure: true,
      sameSite: "None",
      path: "/",
    });
    res.json({
      status: true,
      info: Token,
      role: Existuser.Role,
      msg: "Token generated!",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,

      msg: "Token failed to create!",
    });
  }
};
