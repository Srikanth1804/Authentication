let Express = require("express");
const register = require("./Controllers/register");
const login = require("./Controllers/login");
const verifytoken = require("../middleware/verifytoken");
const Getuser = require("./Controllers/Getuser");
const logout = require("./Controllers/logout");
const forget = require("./Controllers/forget");
const reset = require("./Controllers/reset");
const _delete = require("./Controllers/delete");

let UserRouter = Express.Router();

UserRouter.post("/register", register);
UserRouter.post("/login", login);
UserRouter.get("/get", Getuser);
UserRouter.get("/logout", logout);
UserRouter.post("/forgot-password", forget);
UserRouter.post("/reset-password/:id/:token", reset);
UserRouter.delete("/delete/:id", _delete);
module.exports = UserRouter;
