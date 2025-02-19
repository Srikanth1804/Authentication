module.exports = (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, secure: false });
    res.clearCookie("username", { httpOnly: false, secure: false });
    res.json({
      status: true,
      msg: "Logout Successfully!",
    });
  } catch (error) {
    res.json({
      status: false,
      msg: "Logout Failed!",
    });
  }
};
