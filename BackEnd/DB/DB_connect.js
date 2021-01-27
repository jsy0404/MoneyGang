const mongoose  = require("mongoose");
const config    = require("../configuration.json");

module.exports = () => {
    mongoose.connect(config.DB_host);
    // mongoose.connect(config.DB_host, (err)=>{
    //     if(err){
    //         console.log("DB Failed!");
    //     }else{
    //         console.log("DB Connected!");
    //     }
    // });
    return mongoose.connection;
};

/* DB_Connection */
// mongoose.connect(config.DB_host);
// const DB = mongoose.connection;

// //DB 연결 실패
// DB.on("error", function(){
//     console.log("Connection Failed!");
// });

// // DB 연결 성공
// DB.once("open", function(){
//     console.log("connected!");
// });
/*

// Test Schema 생성
const student = mongoose.Schema({
    name : "string",
    age : "number",
});

// Schema를 객체화
const Student = mongoose.model("member", student);

// Student 객체를 new로 생성
const newStudent = new Student({name:'Ssg', age:'27'});

// save
newStudent.save(function(error, data){
    if(error){
        console.log(error);
    }else{
        console.log('Saved!');
    }
});

*/