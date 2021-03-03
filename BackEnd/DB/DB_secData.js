import mongoose from "mongoose";
import DB from "./DB.js";

const schema = mongoose.Schema;

export default class SecData extends DB {
    constructor() {
        super();
        this.Model = null;
    }

    setTestModel() {
        const test = schema({
            _id: "string",
            Year: "string",
            Month: "string",
            Day: "string",
            Hour: "string",
            Minute: "string",
            Second: "string",
            Price: "number",
            OCvalue: "number"
        }, {
            versionKey: false
        });
        this.Model = mongoose.model("member", test);
    }

    getModel() {
        return this.Model;
    }

    findyear(year) {
        return new Promise((resolve, reject) => {
            this.Model.find(
                {
                    Year: year
                },
                {
                    _id: 1,
                    Price: 1,
                    OCvalue: 1
                },
                (error, data) => {
                    if (error) { reject(error); }
                    else { resolve(data); }
                }
            );
        });
    }

    findmonth(year, month) {
        return new Promise((resolve, reject) => {
            this.Model.find(
                {
                    Year: year,
                    Month: month
                },
                {
                    _id: 1,
                    Price: 1,
                    OCvalue: 1
                },
                (error, data) => {
                    if (error) { reject(error); }
                    else { resolve(data); }
                }
            );
        });
    }

    findday(year, month, day) {
        return new Promise((resolve, reject) => {
            this.Model.find(
                {
                    Year: year,
                    Month: month,
                    Day: day
                },
                {
                    _id: 1,
                    Price: 1,
                    OCvalue: 1
                },
                (error, data) => {
                    if (error) { reject(error); }
                    else { resolve(data); }
                }
            );
        });
    }

    findhour(year, month, day, hour) {
        return new Promise((resolve, reject) => {
            this.Model.find(
                {
                    Year: year,
                    Month: month,
                    Day: day,
                    Hour: hour
                },
                {
                    _id: 1,
                    Price: 1,
                    OCvalue: 1
                }, (error, data) => {
                    if (error) { reject(error); }
                    else { resolve(data); }
                }
            );
        });
    }

    findminute(year, month, day, hour, minute) {
        return new Promise((resolve, reject) => {
            this.Model.find(
                {
                    Year: year,
                    Month: month,
                    Day: day,
                    Hour: hour,
                    Minute: minute
                },
                {
                    _id: 1,
                    Price: 1,
                    OCvalue: 1
                }, (error, data) => {
                    if (error) { reject(error); }
                    else { resolve(data); }
                }
            );
        });
    }

    findsecond(year, month, day, hour, minute, second) {
        return new Promise((resolve, reject) => {
            this.Model.find(
                {
                    Year: year,
                    Month: month,
                    Day: day,
                    Hour: hour,
                    Minute: minute,
                    Second: second
                },
                {
                    _id: 1,
                    Price: 1,
                    OCvalue: 1
                }, (error, data) => {
                    if (error) { reject(error); }
                    else { resolve(data); }
                }
            );
        });
    }

    ocpinsert(date, price, ocvalue) {
        let parsed = date.split("_");
        let modeling = {
            _id: date,
            Year: parsed[0],
            Month: parsed[1],
            Day: parsed[2],
            Hour: parsed[3],
            Minute: parsed[4],
            Second: parsed[5],
            Price: price,
            OCvalue: ocvalue
        };
        const newmodel = new this.Model(modeling);
        newmodel.save((error, data) => {
            if (error) { return (error); }
            else { return (data); }
        });
    }
}
