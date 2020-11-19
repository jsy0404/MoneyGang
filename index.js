const express    = require("express");
const app        = express();
const cors       = require("cors");
const bodyparser = require("body-parser");
const passport   = require("passport");
const cookieSession = require("cookie-session");
require("./passport");

app.use(cors());

app.use(bodyparser.urlencoded({ extended : false }));

app.use(bodyparser.json());

app.use(cookieSession({
        name: "session",
        keys: ["key1", "key2"]
}));

const isLoggedIn = (req, res, next) => {
    if (!req.user) {
        return true;
    }
}; // It it necessary?

app.use(passport.initialize());
app.use(passport.session());

app.get("/", ((req, res) =>
    res.send("Hello World!")));

app.get("/failed", ((req, res) =>
    res.send("You Failed to log in")));

app.get("/success", function (req, res, next){
    var flag = isLoggedIn(req, res, next);
    flag ? res.send("Login First!") :
    res.send(`Welcome! mr ${req.user.displayName}!`);
});

app.get("/login/google",
    passport.authenticate("google", { scope: ["profile", "email"],prompt: "select_account" }));

app.get("/login/google/callback",
    passport.authenticate("google", {failureRedirect: "/login"}),
    function (req, res) {
        res.redirect("/success");
});

app.get("/logout", ((req, res) => {
    req.session = null;
    res.clearCookie("session");
    res.redirect("/");
}));

app.listen(8080);