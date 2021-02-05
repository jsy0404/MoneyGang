/* Multi-Thread */
const cluster = require("cluster");

if(cluster.isMaster){
    //let numcpus = require("os").cpus().length;
    //for(let i = 0; i < numcpus; ++i){
    //    cluster.fork();
    //}
    cluster.fork();
}
else{
    /* Configuration */
    const express       = require("express");
    const bodyparser    = require("body-parser");
    const cors          = require("cors");
    const config        = require("./configuration.json");
    const app           = express();

    /* router */
    const indexRouter   = require("./Router/index.js");
    const dbRounter     = require("./Router/index_DB.js");

    /* DB_Connection */
    const dbconnect     = require("./DB/DB_connect.js");
    //dbconnect();

    
    //db 연결 유뮤 파악 가능 
    const db = dbconnect();
    if(db) console.log("DB Connected!");
    else console.log("DB FAILED");
    

    /* middle-ware setting */
    app.use(bodyparser.urlencoded({extended: false}));
    app.use(bodyparser.json());
    app.use(cors());
    app.use("/", indexRouter);
    app.use("/db", dbRounter);

    app.listen(config.port);
}
