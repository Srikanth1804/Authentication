let Express = require("express");
let Cors = require("cors");
let Mongoose = require("mongoose");
let Dotenv = require("dotenv");
let Cookieparser = require("cookie-parser");
const UserRouter = require("./module/User.routes");
Dotenv.config();

let App = Express();

//middlewares

App.use(Express.json());
App.use(
  Cors({
    origin: "*",
    credentials: true,
  })
);
App.use(Cookieparser());

Mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database Connected!");
  })
  .catch(() => {
    console.log("Database Connection Failed!");
  });

//Routes
App.use("/api", UserRouter);

PORT = process.env.PORT;
App.listen(PORT, () => {
  console.log(`Server running on the port:${PORT}`);
});
