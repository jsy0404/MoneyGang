/* configuration */
const express       = require("express");

/* router */
const routes        = express.Router;
const router        = routes();

/* DB_Connection */
const dbconnect     = require("../DB/DB_connect");
dbconnect(); // { const DB = dbconnect() => 연결 상태 파악 가능 }

/* DB_Schema */
const studentsch    = require("../DB/DB_TestSchema.js");
const hellbeanssg   = studentsch();

/* localhost:3000 */
router.get("/", (req, res) => {
    res.send("Hello World!");
});

/* localhost:3000/testinput */
// router.get("/testinput", (req, res) => {
//     const newhellbeanssg = new hellbeanssg({Name : "bean", Age : 27});
//     newhellbeanssg.save(function(error, data){
//         if(error){
//             console.log(error);
//         }else{
//             console.log("Saved!");
//             res.send("saved!");
//         }
//     });
// });

/* localhost:3000/DB */
router.get("/DB", (req, res) => {
    hellbeanssg.find(function(error, member){
        if(error){
            res.send(error);
        }else{
            res.json(member);
        }
    });
});
 
module.exports = router;