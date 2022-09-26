// const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const express = require("express");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "user",
    keys: ["key1", "key2"],
  })
);
app.set("view engine", "ejs");
app.use("/user", userRouter);
app.use("/auth", authRouter);

// app.use(cookieParser());
app.listen(8080, () => console.log("server running 8080"));
