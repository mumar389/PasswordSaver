require("dotenv").config();
const express = require("express");
const path = require("path");
const port = 7890;
const session = require("express-session");
const passport = require("passport");
const db = require("./config/mongoose");
const jwtStrategy = require("./config/passport-jwt-strategy");
const LocalStrategy = require("./config/local_strategy");
const GoogleStrategy = require("./config/passport-google-strategy");
const app = express();

app.use(express.json());
app.use(
  session({
    secret: `${process.env.SECRET}`,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes"));
app.use(express.static(path.resolve(__dirname, "client", "build")));

//express will serve up the index.html file if routes doesnot match-:
app.get("*", (req, res) => {
  // console.log("Inside me");
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// http://localhost:${port}
app.listen(port, () => {
  console.log(`visit`);
});
