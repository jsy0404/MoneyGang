const mongoose  = require("mongoose");
const config    = require("../configuration.json");

module.exports = () => {
    mongoose.connect(config.DB_host, {useNewUrlParser: true, useUnifiedTopology : true});
    return mongoose.connection;
};

/*
//DB 연결 실패
DB.on("error", function(){
    console.log("Connection Failed!");
});

// DB 연결 성공
DB.once("open", function(){
    console.log("connected!");
});
*/
