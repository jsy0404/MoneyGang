import { Router as router } from "express";
import DB from "../DB/DB_secData.js";
import functions from "../functions.js";

const db = new DB();
const Router = router();
db.setTestModel();

let preprice = null, presecond = null, preminute = null;
let initialize = false;

let loop1 = (year, month, day, hour, minute, second, price) => {
    let date = [year, month, day, hour, minute, second].join("_");
    let tmpsecond = Number(second) + 60;
    let tmpdate = [year, month, day, hour].join("_");
    while (tmpsecond - 1 >= Number(presecond)) {
        tmpsecond--;
        if (tmpsecond > 59) {
            if(tmpsecond - 60 < 10) {
                db.ocpinsert(tmpdate + "_" + minute + "_0" + (tmpsecond - 60) + "_0", preprice, 0);
                db.ocpinsert(tmpdate + "_" + minute + "_0" + (tmpsecond - 60) + "_1", preprice, 1);
                continue;
            }
            db.ocpinsert(tmpdate + "_" + minute + "_" + (tmpsecond - 60) + "_0", preprice, 0);
            db.ocpinsert(tmpdate + "_" + minute + "_" + (tmpsecond - 60) + "_1", preprice, 1);
            continue;
        }
        db.ocpinsert(tmpdate + "_" + preminute + "_" + tmpsecond + "_0", preprice, 0);
        db.ocpinsert(tmpdate + "_" + preminute + "_" + tmpsecond + "_1", preprice, 1);
    }
    db.ocpinsert(date + "_0", price, 0);
};

let loop2 = (year, month, day, hour, minute, second) => {
    let tmpsecond = Number(second);
    let tmpdate = [year, month, day, hour, minute].join("_");
    while (tmpsecond - 1 >= Number(presecond)) {
        tmpsecond--;
        if (tmpsecond < 10) {
            db.ocpinsert(tmpdate + "_0" + tmpsecond + "_0", preprice, 0);
            db.ocpinsert(tmpdate + "_0" + tmpsecond + "_1", preprice, 1);
            continue;
        }
        db.ocpinsert(tmpdate + "_" + tmpsecond + "_0", preprice, 0);
        db.ocpinsert(tmpdate + "_" + tmpsecond + "_1", preprice, 1);
    }
};

Router.post("/read/year", async (req, res) => {
    let odate = req.body.ODate.split("_");
    let cdate = req.body.CDate.split("_");
    let oyear = odate.pop(), cyear = cdate.pop();
    new Promise((resolve) => {
        let result = [];
        const loop = Number(cyear) - Number(oyear);
        for (let i = 0; i < loop; i++) {
            let year = String(Number(oyear) + i);
            const promise2 = db.findyear(year);
            promise2.then((data) => {
                if (functions.checkresult(data)) {
                    data.sort(functions.jsonsort);
                    result.push(functions.pushtojson(data));
                }
                if (i === loop - 1) {
                    resolve(result);
                }
            });
        }
    }).then((data) => { res.json(data); });
});

Router.post("/read/month", async (req, res) => {
    let odate = req.body.ODate.split("_");
    let cdate = req.body.CDate.split("_");
    let omonth = odate.pop(), cmonth = cdate.pop();
    let oyear = odate.pop();
    new Promise((resolve) => {
        let result = [];
        let year = oyear;
        const loop = Number(cmonth) - Number(omonth);
        for (let i = 0; i < loop; i++) {
            let month = Number(omonth) + i;
            if (month < 10) { month = "0" + String(month); }
            else { month = String(month); }
            const promise2 = db.findmonth(year, month);
            promise2.then((data) => {
                if (functions.checkresult(data)) {
                    data.sort(functions.jsonsort);
                    result.push(functions.pushtojson(data));
                }
                if (i === loop - 1) {
                    resolve(result);
                }
            });
        }
    }).then((data) => { res.json(data); });
});

Router.post("/read/day", async (req, res) => {
    let odate = req.body.ODate.split("_");
    let cdate = req.body.CDate.split("_");
    let oday = odate.pop(), cday = cdate.pop();
    let omonth = odate.pop();
    let oyear = odate.pop();
    new Promise((resolve) => {
        let result = [];
        let year = oyear;
        let month = omonth;
        const loop = Number(cday) - Number(oday);
        for (let i = 0; i < loop; i++) {
            let day = Number(oday) + i;
            if (day < 10) { day = "0" + String(day); }
            else { day = String(day); }
            const promise2 = db.findday(year, month, day);
            promise2.then((data) => {
                if (functions.checkresult(data)) {
                    data.sort(functions.jsonsort);
                    result.push(functions.pushtojson(data));
                }
                if (i === loop - 1) {
                    resolve(result);
                }
            });
        }
    }).then((data) => { res.json(data); });

});

Router.post("/read/hour", async (req, res) => {
    let odate = req.body.ODate.split("_");
    let cdate = req.body.CDate.split("_");
    let ohour = odate.pop(), chour = cdate.pop();
    let oday = odate.pop();
    let omonth = odate.pop();
    let oyear = odate.pop();
    new Promise((resolve) => {
        let result = [];
        let year = oyear;
        let month = omonth;
        let day = oday;
        const loop = Number(chour) - Number(ohour);
        for (let i = 0; i < loop; i++) {
            let hour = Number(ohour) + i;
            if (hour < 10) { hour = "0" + String(hour); }
            else { hour = String(hour); }
            const promise2 = db.findhour(year, month, day, hour);
            promise2.then((data) => {
                if (functions.checkresult(data)) {
                    data.sort(functions.jsonsort);
                    result.push(functions.pushtojson(data));
                }
                if (i === loop - 1) {
                    resolve(result);
                }
            });
        }
    }).then((data) => { res.json(data); });
});

Router.post("/read/minute", async (req, res) => {
    let odate = req.body.ODate.split("_");
    let cdate = req.body.CDate.split("_");
    let ominute = odate.pop(), cminute = cdate.pop();
    let ohour = odate.pop();
    let oday = odate.pop();
    let omonth = odate.pop();
    let oyear = odate.pop();
    new Promise((resolve) => {
        let result = [];
        let year = oyear;
        let month = omonth;
        let day = oday;
        let hour = ohour;
        const loop = Number(cminute) - Number(ominute);
        for (let i = 0; i < loop; i++) {
            let minute = Number(ominute) + i;
            if (minute < 10) { minute = "0" + String(minute); }
            else { minute = String(minute); }
            const promise2 = db.findminute(year, month, day, hour, minute);
            promise2.then((data) => {
                if (functions.checkresult(data)) {
                    data.sort(functions.jsonsort);
                    result.push(functions.pushtojson(data));
                }
                if (i === loop - 1) {
                    resolve(result);
                }
            });
        }
    }).then((data) => { res.json(data); });
});

Router.post("/read/second", async (req, res) => {
    let odate = req.body.ODate.split("_");
    let cdate = req.body.CDate.split("_");
    let osecond = odate.pop(), csecond = cdate.pop();
    let ominute = odate.pop();
    let ohour = odate.pop();
    let oday = odate.pop();
    let omonth = odate.pop();
    let oyear = odate.pop();
    new Promise((resolve) => {
        let result = [];
        let year = oyear;
        let month = omonth;
        let day = oday;
        let hour = ohour;
        let minute = ominute;
        const loop = Number(csecond) - Number(osecond);
        for (let i = 0; i < loop; i++) {
            let second = Number(osecond) + i;
            if (second < 10) { second = "0" + String(second); }
            else { second = String(second); }
            const promise2 = db.findsecond(year, month, day, hour, minute, second);
            promise2.then((data) => {
                if (functions.checkresult(data)) {
                    data.sort(functions.jsonsort);
                    result.push(functions.pushtojson(data));
                }
                if (i === loop - 1) {
                    resolve(result);
                }
            });
        }
    }).then((data) => { res.json(data); });
});

Router.post("/push", (req, res) => {
    let date = req.body.Date;
    let splitedDate = date.split("_");
    let second = splitedDate.pop();
    let minute = splitedDate.pop();
    let hour = splitedDate.pop();
    let day = splitedDate.pop();
    let month = splitedDate.pop();
    let year = splitedDate.pop();
    let price = req.body.Price;

    if (!initialize) {
        preprice = price;
        preminute = minute;
        presecond = second;
        initialize = true;
        db.ocpinsert(date + "_0", price, 0);
        res.send("OK");
        return;
    }

    if (presecond === second) {
        db.ocpinsert(date + "_1", price, 1);
        preprice = price;
        res.send("OK");
        return;
    }

    if (preminute !== minute) {
        loop1(year, month, day, hour, minute, second, price);
        presecond = second;
        preminute = minute;
        preprice = price;
        res.send("OK");
        return;
    }

    loop2(year, month, day, hour, minute, second);
    db.ocpinsert(date + "_0", price, 0);
    presecond = second;
    preminute = minute;
    preprice = price;
    res.send("OK");
    return;
});

export default Router;
