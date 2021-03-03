/* import modules */
import express from "express";
import cluster from "cluster";
import bodyparser from "body-parser";
import cors from "cors";
import os from "os";
import config from "./configuration.js";
import indexRouter from "./Router/index.js";
import dbRouter from "./Router/index_DB.js";

if (cluster.isMaster) {
    let numcpus = os.cpus().length / 2;
    for (let i = 0; i < numcpus; ++i) { cluster.fork(); }
    //    cluster.on("exit", (worker, code, signal) => {
    //        // console.log("Worker terminated" + worker.id);
    //        if (code === 200) { cluster.fork(); }
    //    });
    //}
} else {
    // console.log("Worker created : " + cluster.worker.id);
    const app = express();
    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(bodyparser.json());
    app.use(cors());
    app.use("/", indexRouter);
    app.use("/db", dbRouter);
    // app.listen(config.port, () => { console.log(`${config.port} is listening`) });
    app.listen(config.port);
}
