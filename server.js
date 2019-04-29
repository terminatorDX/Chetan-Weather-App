const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const temperature = require("./temperature");
const cookieParser = require("cookie-parser");
const sqldb = require("./sqldb");
const userInfo = require("./userinfo");

const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const expressSession = require("express-session");
let Placename = "flag";
let lat = 0;
let lng = 0;
let id = 0;

app.use("/", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({ secret: "i have a dog" }));
app.use(passport.initialize());
app.use(passport.session());

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/failure"
  })
);

passport.use(
  new passportLocal(function(username, password, done) {
    sqldb.getUser(username, function(data) {
      if (username != data[0].username) {
        console.log("wrong username");
        return done(null, false, { message: "wrong username" });
      }
      if (password != data[0].password) {
        console.log("wrong password");
        return done(null, false, { message: "wrong password" });
      }
      console.log("verified :" + data[0].fullname);
      return done(null, data[0].username);
    });
  })
);

passport.serializeUser(function(user, done) {
  console.log("serializing :" + user);
  username = user;
  return done(null, user);
});

app.get("/location", (req, res) => {
  location = req.body.location;
  lat = req.query.lat;
  lng = req.query.lng;
  res.sendStatus(200);
});

passport.deserializeUser(function(id, done) {
  console.log("deserializing " + id);
  return done(null, id);
});
app.get("/success", function(req, res) {
  // sqldb.logging(req.body.username);
  console.log("login successfull");
  res.redirect("home.html");
});
app.get("/failure", function(req, res) {
  req.logout();
  res.redirect("/"); //
});
app.post("/signup", function(req, res) {
  sqldb.signup(
    req.body.username,
    req.body.fullname,
    req.body.password,
    req.body.email,
    req.body.bday,
    req.body.address,
    lat,
    lng,
    function(data) {
      res.redirect("/");
    }
  );
});
app.get("/data", function(req, res) {
  if (req.user) {
    res.send("validated");
  } else {
    res.redirect("/");
  }
});
//for search bar datalist
app.post("/display", function(req, res) {
  res.send(userInfo);
});

//info of user by clicking on map
//kam bacha h

//for search bar searches
app.post("/searchDisplay", (req, res) => {
  Placename = req.body.place;
  console.log(Placename);
  if (Placename !== "flag") {
    for (let i = 0; i < userInfo.length; ++i) {
      if (Placename === userInfo[i].place) {
        console.log("mil gaya----------------------" + userInfo[i].user);
        movie = userInfo[i];
        Placename = "flag";
        res.send(userInfo[i]);
        break;
      }
    }
  } else {
    console.log(
      "---------------------------nai bna h kuch------------------------"
    );
  }
});
app.get("/findByMarker", (req, res) => {
  id = req.query.id;
  res.sendStatus(200);
});

app.post("/hisInfo", (req, res) => {
  console.log("his info ------------------------" + id);
  for (let i = 0; i < temperature.length; ++i) {
    console.log("his info--------------" + temperature[i].id);
    if (id == temperature[i].id) {
      console.log(
        "mil gaya----------------------" +
          temperature[i].user +
          "----------id k sth"
      );
      res.send(temperature[i]);
      id = 0;
      break;
    }
  }
});

app.post("/mapgoogle", (req, res) => {
  res.send(userInfo);
});

app.listen(PORT, function(req, res) {
  console.log("server is listening at port:" + PORT);
  sqldb.connectDb();
});
