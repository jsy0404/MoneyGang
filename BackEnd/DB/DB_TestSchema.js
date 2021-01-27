const mongoose = require("mongoose");
const schema = mongoose.Schema;

module.exports = () => {
    const hellbeanssg = schema({
        Name    : "string",
        Age     : "number",
    });
    return mongoose.model("Member", hellbeanssg);
};