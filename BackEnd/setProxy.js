/* React-Node Link */
const proxy     = require("http-proxy-middleware");
const config    = require("./configuration.json");

module.exports = (app) => {
    app.use(
        proxy("/", {
            target: "http://localhost:" + config.port + "/"
        })
    );
};
