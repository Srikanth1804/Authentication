let Express = require("express");
let Cors = require("cors");
let Mongoose = require("mongoose");
let Dotenv = require("dotenv");
let Cookieparser = require("cookie-parser");
const UserRouter = require("./module/User.routes");
Dotenv.config();

let App = Express();

//middlewares

const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-lf1yr64bh-srikanths-projects-8cc0fd19.vercel.app",
];

App.use(Express.json());
App.use(
  Cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, //    Important for cookies/sessions
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

PORT = process.env.PORT || 3001;
App.listen(PORT, () => {
  console.log(`Server running on the port:${PORT}`);
});
