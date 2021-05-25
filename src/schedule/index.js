const schedule = require('node-schedule');
const getContactFromOCR = require('./../job/GetContact')



const job = schedule.scheduleJob('0 0 3 * * *', function(fireDate){
   // console.log(fireDate)
    //console.log(fireDate.toLocaleString())
    getContactFromOCR()
});


module.exports = job