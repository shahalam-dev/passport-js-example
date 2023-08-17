const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { connect, User } = require("./database");
const { initializingPassport } = require("./passport.conf");
const passport = require("passport");
const expressSession = require("express-session");
const e = require("express");

//initializing
connect();
initializingPassport(passport);

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  expressSession({
    secret: "XXXXXX",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/api/users", require("./routes/users"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  const user = User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  const newUser = User.create(req.body);
  res.send(newUser);
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
