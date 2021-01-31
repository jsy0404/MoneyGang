/* configuration */
const express       = require("express");

/* router */
const routes        = express.Router;
const router        = routes();

/* localhost:3000 */
router.get("/", (req, res) => {
    res.send("Hello World!");
});

module.exports = router;
