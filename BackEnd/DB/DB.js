import mongoose from "mongoose";
import config from "../configuration.js";

export default class mongo {
    constructor() {
        this.connection = this.connect();
    }

    connect() {
        mongoose.connect(
            config.DB_host,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        return mongoose.connection;
    }

    isconnected() {
        return this.connection;
    }
}
