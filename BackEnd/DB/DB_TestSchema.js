const mongoose = require("mongoose");
const schema   = mongoose.Schema;

module.exports = () => {
    const hellbeanssg = schema({
        _id         : "string",
        Price       : "number",
        OCvalue     : "number"
    },{
        versionKey : false
    });
    return mongoose.model("Member", hellbeanssg);
};
