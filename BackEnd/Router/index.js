import {Router as router} from "express";

const Router = router();

Router.get("/", (req, res) => {
    res.send("Hello ES6!!!!");
});

Router.get("/router", (req, res) => {
    res.send("Hello World!!!!");
});

export default Router;
