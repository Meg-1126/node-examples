const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const users = [
  {id: 1, name: "Meg", email: "test@email.com", password: 1234},
  {id: 2, name: "Yuto", email: "test2@email.com", password: 10},
]

app.get("/", (req, res) => {
  res.render("users", { users });
});

app.get("/register", (req, res) => {
  res.render("users", { users });
});

app.post("/register", (req, res) => {
  res.cookie("username", req.body.name);
  res.cookie("useremail", req.body.email);
  res.cookie("userpassword", req.body.password);
  res.send(req.body.email);
})

app.get("/login", (req, res) => {
  res.render("login", { users });
});

app.post("/login", (req, res) => {
  users.map((user) => {
    if ((req.body.email === user.email)&&(+req.body.password === user.password)) {
      res.cookie("username", req.body.name);
      res.cookie("useremail", req.body.email);
      res.cookie("userpassword", req.body.password);
      res.send("Email and Password are already stored.");
      return;
    }
  })
  res.send("Email and Password don't match.");
})

app.get("/logout", (req, res) => {
  res.render("logout", { users });
})

app.post("/logout", (req, res) => {

  res.redirect("/");
})



app.listen(3002, () => console.log("Server 3002 is running"));