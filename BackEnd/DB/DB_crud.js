/* DB_Schema */
const testsch   = require("./DB_TestSchema.js");
const testmodel = testsch();

module.exports = () => {
    return {
        /*
        findall : () => {
            return new Promise((resolve, reject) => {
                HellBeanSsg.find({}, {}, (error, member) => {
                    if(error){
                        reject(error);vw
                    }else{
                        resolve(member);
                    }
                });
            });
        },
        
        findbyname : (arg1) => {
            return new Promise((resolve, reject) => {
                HellBeanSsg.find({Name : arg1}, {}, (error, member) => {
                    if(error){
                        reject(error);
                    }else{
                        resolve(member);
                    }
                });
            });
        },
        */
        findocvalue : (date) => {
            return new Promise((resolve, reject) => {
                testmodel.findOne({_id : date}, (error, data) => {
                    if(error){
                        resolve(null);
                    }else{
                        resolve(data);
                    }
                });
            });
        },
        opinsert : (date, price) => {
            let modeling =  {
                _id : date,
                Price : price,
                OCvalue : 0
            };
            const newtestmodel = new testmodel(modeling);
            newtestmodel.save((error, data) => {
                if(error){
                    return(error);
                }else{
                    return(data);
                }
            });
        },
        cpinsert : (date, price) => {
            let modeling =  {
                _id : date,
                Price : price,
                OCvalue : 1
            };
            const newtestmodel = new testmodel(modeling);
            newtestmodel.save((error, data) => {
                if(error){
                    return(error);
                }else{
                    return(data);
                }
            });
        }
    };
};
