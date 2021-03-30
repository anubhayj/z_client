const zoomServices = require("../zoomServices/zoomServices")
const moment = require('moment')

module.exports = async function tasks(req, res) {

    let { tenantId } = req.query
    let dbWrite = req.app.get("pool")[tenantId].dbWrite
    let dbRead = req.app.get("pool")[tenantId].dbRead
    /** Check if its one time run or daily run */
    let days = 90
    let docType = 'Complete'
    let lastJob;

    let isNewJob = await dbRead.findDoc({ "docType": { "$in": ["Complete"] } }, "z_client_jobs")
    console.log(`Checking if its first run  ---> ${JSON.stringify(isNewJob)}`)

    if (isNewJob !== null && isNewJob.docType === 'Complete') {
        console.log("::::: ----> Here")
        docType = 'Incremental'
        days = 1
        lastJob = await dbRead.aggregateDocs([
            { $match: { "docType": "Incremental" } },
            { $sort: { insertedDate: -1 } },
            { $limit: 1 }],
            "z_client_jobs")

        console.log(" -----> ", lastJob)
        if (lastJob !== null && lastJob[0]["insertedDate"] === moment(new Date()).format("YYYY-MM-DD")) {
            console.log(' Exit Status True :: This date is processed successfully ')
            return;
        }

    }

    let data = zoomServices.usageReports(days)
    await dbWrite.insertDocs(data, "DailyUsage")

    let meeting_data = zoomServices.userWiseMeetingReports(days)
    await dbWrite.insertDocs(meeting_data, "userWiseMeetingReport")

    let date = moment(new Date()).format("YYYY-MM-DD")
    await dbWrite.insertDocs([{
        docType: docType,
        insertedDate: date
    }], "z_client_jobs")

    console.log(` -------------- Task Completed -----------------`)

}


