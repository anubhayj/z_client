const zoomServices = require("../zoomServices/zoomServices")

module.exports = async function tasks(req, res) {

    let { tenantId } = req.query
    let dbWrite = req.app.get("pool")[tenantId].dbWrite
    /** Check if its one time run or daily run */
    let days = 90
    // Gives overall report
    /**
         {
            date: '2021-03-26',
            new_users: 4,
            meetings: 24,
            participants: 22,
            meeting_minutes: 60
        }
     */

    let data = zoomServices.usageReports(days)
    await dbWrite.insertDocs(data, "DailyUsage")

    let meeting_data = zoomServices.userWiseMeetingReports()
    console.log("Meeting data ---", meeting_data, typeof (meeting_data))
    await dbWrite.insertDocs(meeting_data, "userWiseMeetingReport")

}


