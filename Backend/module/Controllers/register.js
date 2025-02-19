let UserModel = require("../../model/User.model");
let bcrypt = require("bcrypt");
module.exports = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    let Existuser = await UserModel.findOne({ Email: email });

    if (Existuser) {
      return res.json({
        status: false,
        msg: "User already exists!",
      });
    }

    let hashpassword = await bcrypt.hash(password, 10);

    let Newuser = UserModel.create({
      Name: name,
      Email: email,
      Password: hashpassword,
      Role: role,
    })
      .then((data) => {
        res.json({
          status: true,
          info: data,
          msg: "Registration Success!",
        });
      })
      .catch((e) => {
        res.json({
          status: false,
          info: e,
          msg: "Registration Failed!",
        });
      });
  } catch (error) {
    console.log(error);
  }
};
