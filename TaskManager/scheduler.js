const cron = require('node-cron');
const request = require('requests')
const helpers = require("../utils/helper")
const ingest = require('../IngestionController/ingest')



function runTasks() {

    // 0 1 * * * everyday at 1am
    return cron.schedule('*/50 * * * * *', () => {
        console.time("SchedulerTime")
        console.log(` -------------- Scheduled job started at : ${new Date} -------------- `)
        //ingest()
        try {
            helpers.makeRequest('GET', 'http://127.0.0.1:8080/orc/v1/ingest?tenantId=POC_con1', "", {})
        } catch (error) {
            console.log("error ------------> ", error)
        }
        console.log(` -------------- Completed Scheduled jobs : ${new Date} --------------- `)
        console.timeEnd("SchedulerTime")

    }, {
        scheduled: true,
        timezone: "Asia/Kolkata"
    });
}

module.exports = runTasks


