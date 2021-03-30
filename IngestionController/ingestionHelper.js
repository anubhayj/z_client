const dailyUsage = require("./daily_meeting")

function extractDailyUsage(req) {
    /** Check days */
    db = global.db
    console.log(db)
    let days = 0
    let dbWrite = req.app.get("pool")[tenantId].dbWrite
    let data = dailyUsage(days)

    await dbWrite.insertDocs(data, "DailyUsage")

}

module.exports = {
    extractDailyUsage: extractDailyUsage

}