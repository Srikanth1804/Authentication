let Jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    let Token = req.cookies.token;

    if (!Token) {
      return res.json({
        status: false,
        msg: "Token is missing!",
      });
    }

    let decoded = Jwt.verify(Token, process.env.SECRET_KEY);

    req.user = decoded;
    next();
  } catch (error) {
    return res.json({
      status: false,
      msg: "invalid or expired token",
    });
  }
};
