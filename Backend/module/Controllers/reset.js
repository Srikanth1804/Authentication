let Jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let UserModel = require("../../model/User.model");
module.exports = async (req, res) => {
  try {
    let { password } = req.body;
    let { id, token } = req.params;

    let Verifytoken = await Jwt.verify(token, process.env.SECRET_KEY);

    if (!Verifytoken) {
      res.json({
        status: false,
        msg: "invalid token!",
      });
    }

    let hashpwd = await bcrypt.hash(password, 10);

    await UserModel.findByIdAndUpdate(id, { Password: hashpwd })
      .then((data) => {
        res.json({
          status: true,
          info: data,
          msg: "Password Updated Successfully!",
        });
      })
      .catch((e) => {
        res.json({
          status: false,
          msg: "Failed to Update!",
        });
      });
  } catch (error) {
    console.log(error);
  }
};
