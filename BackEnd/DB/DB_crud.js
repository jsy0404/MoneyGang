/* DB_Schema */
const studentsch    = require("./DB_TestSchema.js");
const HellBeanSsg   = studentsch();

module.exports = () => {
    return {
        findall : () => {
            return new Promise((resolve, reject) => {
                HellBeanSsg.find({}, {}, (error, member) => {
                    if(error){
                        reject(error);
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
        findbyAge : (arg1) => {
            return new Promise((resolve, reject) => {
                HellBeanSsg.find({Age : arg1}, {}, (error, member) => {
                    if(error){
                        reject(error);
                    }else{
                        resolve(member);
                    }
                });
            });
        },
        insert : (arg1) => {
            let modeling =  {
                Name : arg1.Name,
                Age : arg1.Age
            };
            const newhellbeanssg = new HellBeanSsg(modeling);
            newhellbeanssg.save(function(error, data){
                if(error){
                    return(error);
                }else{
                    return(data);
                }
            });
        }
    };
};
