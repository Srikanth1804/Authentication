let UserModel = require("../../model/User.model");

module.exports = (req, res) => {
  UserModel.find({})
    .then((data) => {
      res.json({
        status: true,
        info: data,
        msg: "Data finded!",
      });
    })
    .catch((e) => {
      res.json({
        status: false,
        info: e,
        msg: "Data not finded!",
      });
    });
};
