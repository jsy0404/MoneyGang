/*====================================
       Load All Dependencies
======================================*/

const express       = require("express");
const cors          = require("cors");
const bodyparser    = require("body-parser");
const passport      = require("passport");
const cookieSession = require("cookie-session");
const mongoose      = require("mongoose");
require("./passport_config");
// const Session       = require("express-session");

/*====================================
       Load The Configuration
======================================*/

const config = require("./mongoose_config");
const port   = process.env.port || 8080;


mongoose.connect(config.mongodbUri);    //test
// const DB = mongoose.connection;         //test
// DB.on("error");                         //test
// DB.once("open");                        //test




/*====================================
      Express Configuration
======================================*/

const app = express();

/*====================================
   Parse Json and URL-Encoded query
======================================*/

app.use(bodyparser.urlencoded({ extended : false }));
app.use(bodyparser.json());
app.use(cors());

// set the secret key variable for jwt.
app.set("jwt-secret", config.secret);

app.use(cookieSession({
    name : "session",
    keys  : ["key1", "value2"]
}));

const isLoggedIn = (req) => {
    if (!req.user) {
        return true;
    }
};

app.use(passport.initialize());
app.use(passport.session());

// Main page
app.get("/", ((req, res) =>
    res.send("Hello World!")));

// Login failed page
app.get("/failed", ((req, res) =>
    res.send("You Failed to log in")));

// Login success page
app.get("/success", function (req, res){
    let flag = isLoggedIn(req);
    flag ? res.send("Login First!") :
        res.send(`Welcome! mr ${req.user.displayName}!`);
});

// Google login page
app.get("/login/google",
    passport.authenticate("google", { scope: ["profile", "email"],prompt: "select_account" }));

// Call back
app.get("/login/google/callback",
    passport.authenticate("google", {failureRedirect: "/login"}),
    function (req, res) {
        res.redirect("/success");
});

// Logout page -> redirect to main page
app.get("/logout", ((req, res) => {
    req.session = null;
    res.clearCookie("session");
    res.redirect("/");
}));

// Open the server
app.listen(port);