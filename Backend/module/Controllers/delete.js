let UserModel = require("../../model/User.model");

module.exports = (req, res) => {
  let { id } = req.params;

  console.log("Delete Request for ID:", id); // Debug log

  if (!id) {
    return res.status(400).json({
      status: false,
      msg: "User ID is required!",
    });
  }

  UserModel.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          status: false,
          msg: "User not found!",
        });
      }
      res.json({
        status: true,
        msg: "User Deleted!",
      });
    })
    .catch((e) => {
      console.error("Error deleting user:", e);
      res.status(500).json({
        status: false,
        msg: "User failed to delete!",
        error: e.message,
      });
    });
};
