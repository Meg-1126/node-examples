const cookieParser = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 12;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
const users = {
  test: {
    name: "Test",
    username: "test",
    password: "1234",
  },
};

const hashPassword = async(password, saltRounds) => {
  const salt = await bcrypt.genSalt(saltRounds);
  console.log("salt", salt);
  const hash = await bcrypt.hash(password, salt);
  console.log("hash", hash);
  return hash;
}



app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const hash = await hashPassword(req.body.password, saltRounds);
  console.log("hash", hash);
  const receivedUsername = req.body.username;
  users[receivedUsername] = {
    ...req.body, password:hash
  };
  
  console.log("users", users);
  res.cookie("username", receivedUsername);
  res.redirect("/profile");
});

app.get("/profile", (req, res) => {
  const username = req.cookies.username;
  if (!username) return res.redirect("/login");
  // if username = test2
  // users['test2']
  // users.test2 = {}
  const user = users[username];
  res.render("profile", { user });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const receivedUsername = req.body.username;
  const receivedPassword = req.body.password;
  const user = users[receivedUsername];
  console.log("isMatch", isMatch);
  // {} or undefined
  if (!user) return res.send("invalid username");
  const isMatch = await bcrypt.compare(receivedPassword, user.password);
  if (!isMatch) {
    res.cookie("username", user.username);
    return res.redirect("/profile");
  }
  res.send("invalid password");
});

app.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/login");
});

app.listen(8080, () => console.log("server running 8080"));
