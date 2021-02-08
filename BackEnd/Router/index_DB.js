/* configuration */
const express       = require("express");
const dbcrud        = require("../DB/DB_crud.js");
const db            = dbcrud();

/* router */
const routes        = express.Router;
const router        = routes();

let preprice        = null;
let presecond       = null;
let preminute       = null;

router.post("/read1", async (req, res) => {
    let date = req.body.Date.split("_");
    console.log(date.length);
    if(date.length === 1){
        db.find
    }
    /*
    let ovalue = null, cvalue = null;
    const opromise = db.findocvalue(req.body.Date + "_0");
    opromise.then((ov) => {
        ovalue = ov;
        const cpromise = db.findocvalue(req.body.Date + "_1");
        cpromise.then((cv) => {
            cvalue = cv;
            console.log(ovalue, cvalue);
        });
    });
    */

    /*
    const promise = db.findall();   
    let result = [];
    promise.then((promisevalue) => {
        promisevalue.forEach((element) => {
            result.push(
                {
                    Name : element.Name,
                    Age : element.Age
                }
            );
        });
        res.json(result);
    });
    */
});

/*
 * localhost:3000/DB/read2/Name
 * find with Name
 * get test
 
router.get("/read2/:Name", async (req, res) => {
    const promise = db.findbyname(req.params.Name);
    let result = [];
    promise.then((promisevalue) => {
        promisevalue.forEach((element) => {
            result.push(
                {
                    Name : element.Name,
                    Age : element.Age
                }
            );
        });
        res.json(result);
    });
});
*/

/*
 * localhost:3000/db/read3
 * find with Age
 * post test
 
router.post("/read3/", async (req, res) => {
    const promise = db.findbyAge(req.body.Age);
    let result = [];
    promise.then((promisevalue) => {
        promisevalue.forEach((element) => {
            result.push(
                {
                    Name : element.Name,
                    Age : element.Age
                }
            );
        });
        res.json(result);
    });
});
*/

/* 
 * localhost:3000/db/testinput/one 
 * insert one element
 * post test
 */
router.post("/insert", async (req, res) => {
    let date = req.body.Date.split("_");
    let year = date[0];
    let month = date[1];
    let day = date[2];
    let hour = date[3];
    let minute = date[4];
    let second = date[5];
    date = year + "_" + month + "_" + day + "_" + hour + "_" + minute + "_" + second; 
    price = req.body.Price;

    /* 서버 실행시 한번만 실행됨 */
    if(!preprice)  preprice  = price;
    if(!preminute) preminute = minute;
    if(!presecond) {
        presecond = second;
        db.opinsert(date + "_0", price);
    }
    else {
        if (presecond !== second) {
            if (preminute !== minute) {
                let tmpsecond = Number(second) + 60;
                let tmpdate = year + "_" + month + "_" + day + "_" + hour; 
                while (tmpsecond - 1 > Number(presecond)) {
                    if(tmpsecond - 1 > 59){
                        if(tmpsecond - 61 < 10){
                            tmpsecond--;
                            db.opinsert(tmpdate + "_" + minute + "_0" + (tmpsecond - 60) + "_0", preprice);
                            db.cpinsert(tmpdate + "_" + minute + "_0" + (tmpsecond - 60) + "_1", preprice);
                        }
                        else{
                            tmpsecond--;
                            db.opinsert(tmpdate + "_" + minute + "_" + (tmpsecond - 60) + "_0", preprice);
                            db.cpinsert(tmpdate + "_" + minute + "_" + (tmpsecond - 60) + "_1", preprice);
                        }
                    }
                    else{
                        tmpsecond--;
                        db.opinsert(tmpdate + "_" + preminute + "_" + tmpsecond + "_0", preprice);
                        db.opinsert(tmpdate + "_" + preminute + "_" + tmpsecond + "_1", preprice);
                    }
                }
            }
            else {
                let tmpsecond = Number(second);
                let tmpdate = year + "_" + month + "_" + day + "_" + hour + "_" + minute; 
                while (tmpsecond - 1 > Number(presecond)) {
                    if(tmpsecond - 1 < 10){
                        tmpsecond--;
                        db.opinsert(tmpdate + "_0" + tmpsecond + "_0", preprice);
                        db.cpinsert(tmpdate + "_0" + tmpsecond + "_1", preprice);
                    }
                    else{
                        tmpsecond--;
                        db.opinsert(tmpdate + "_" + tmpsecond + "_0", preprice);
                        db.cpinsert(tmpdate + "_" + tmpsecond + "_1", preprice);
                    }
                }
            }
            db.opinsert(date + "_0", price);
            presecond = second;
            preminute = minute;
            preprice  = price;
        }
        else if(presecond === second) {
            db.cpinsert(date + "_1", price);
            preprice = price;
        }
    }
    res.send("OK");
});

/* 
 * localhost:3000/db/testinput/one 
 * insert many element
 * post test
 */
router.post("/insert/many", async (req, res) => {
    req.body.forEach((element) => {
        if(!(!element.Age || !element.Name)){
            db.insert(element);
        }
    });
    res.json("result");
});

module.exports = router;
