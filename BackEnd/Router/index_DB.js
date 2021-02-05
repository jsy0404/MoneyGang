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
    let oValue = null, cValue = null;

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
    date = req.body.Date;
    price = req.body.Price;
    second = date.slice(10, 12);
    minute = date.slice(8, 10);

    /* 서버 실행시 한번만 실행됨 */
    if(!preprice)  preprice  = price;
    if(!preminute) preminute = minute;
    if(!presecond) {
        presecond = second;
        db.opinsert(date + 0, price);
    }
    else {
        if (presecond !== second) {
            if (preminute !== minute) {
                let tmpsecond = Number(second) + 60;
                let tmpdate = date.slice(0, 8);
                while (tmpsecond - 1 > Number(presecond)) {
                    if(tmpsecond - 1 > 59){
                        if(tmpsecond - 61 < 10){
                            tmpsecond--;
                            db.opinsert(tmpdate + minute + 0 + (tmpsecond - 60) + 0, preprice);
                            db.cpinsert(tmpdate + minute + 0 + (tmpsecond - 60) + 1, preprice);
                        }
                        else{
                            tmpsecond--;
                            db.opinsert(tmpdate + minute + (tmpsecond - 60) + 0, preprice);
                            db.cpinsert(tmpdate + minute + (tmpsecond - 60) + 1, preprice);
                        }
                    }
                    else{
                        tmpsecond--;
                        db.opinsert(tmpdate + preminute + tmpsecond + 0, preprice);
                        db.opinsert(tmpdate + preminute + tmpsecond + 1, preprice);
                    }
                }
            }
            else {
                let tmpsecond = Number(second);
                let tmpdate = date.slice(0, 10);
                while (tmpsecond - 1 > Number(presecond)) {
                    if(tmpsecond - 1 < 10){
                        tmpsecond--;
                        db.opinsert(tmpdate + 0 + tmpsecond + 0, preprice);
                        db.cpinsert(tmpdate + 0 + tmpsecond + 1, preprice);
                    }
                    else{
                        tmpsecond--;
                        db.opinsert(tmpdate + tmpsecond + 0, preprice);
                        db.cpinsert(tmpdate + tmpsecond + 1, preprice);
                        console.log(tmpdate + tmpsecond + 1, preprice, "134");
                    }
                }
            }
            db.opinsert(date + 0, price);
            presecond = second;
            preminute = minute;
            preprice  = price;
        }
        else if(presecond === second) {
            db.cpinsert(date + 1, price);
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
