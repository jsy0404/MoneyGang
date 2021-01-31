/* configuration */
const express       = require("express");
const dbcrud        = require("../DB/DB_crud.js");
const db            = dbcrud();

/* router */
const routes        = express.Router;
const router        = routes();

/*
 * localhost:3000/DB/read1
 * find all
 * get test
 */
router.get("/read1", async (req, res) => {
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
});

/*
 * localhost:3000/DB/read2/Name
 * find with Name
 * get test
 */
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

/*
 * localhost:3000/db/read3
 * find with Age
 * post test
 */
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

/* 
 * localhost:3000/db/testinput/one 
 * insert one element
 * post test
 */
router.post("/insert/one", async (req, res) => {
    if(!req.body.Name || !req.body.Age){
        res.send("Not enough information for modeling.");
    }else{
        const promise = db.insert(req.body.Name, req.body.Age);
        promise.then((promisevalue) => {
            res.json(promisevalue);
        });
    }
});

/* 
 * localhost:3000/db/testinput/one 
 * insert many element
 * post test
 * DB 저장은 동기여야 할까 비동기여야 할까??
 * 비동기식으로 저장할때는 결과값이 전달이 안된다. -> 그냥 시켜놓고 따른일을 하러감.
 * 동기로 하면 결과를 받아볼수 있다. -> 결과가 리턴될때까지 기다린다.
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
