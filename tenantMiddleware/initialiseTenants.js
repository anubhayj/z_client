/* eslint-disable no-undef */
const dbServices = require('../dbManager/dbServices');
const constants = require('../Constants/appConstants')

const getTenantDB = async function (req, res, next) {

    // Get tenantID from token
    let { tenantId } = req.query
    console.log(req)
    console.log("Testing ----> ", tenantId, req.url)
    let pool = req.app.get("pool");
    if (pool === undefined) pool = {};
    console.log(`Checking Tenant Pool for  ::::  ${tenantId} ---> ${pool[tenantId]}`)
    if (tenantId.length > 1 && !pool[tenantId]) {
        let mongoDbUrl = constants.localUrl || process.env["MONGODB_URL"]
        let getEcamDb = new dbServices(mongoDbUrl, "", constants.globalDbName)
        let tenantDbObj = await getEcamDb.aggregateDocs(
            [{ "$match": { "_id": tenantId } }, { "$project": { "mongo_db": 1, "mongo_url": 1, "mongo_crt": 1 } }], constants.globalCollectionName)
        console.log("tenantDbObj", tenantDbObj, tenantDbObj.length)
        console.log(" tenant db obj ", JSON.stringify(tenantDbObj))
        if (tenantDbObj !== [] && !tenantDbObj.length < 1) {
            let tenantDBRead = new dbServices(tenantDbObj[0].mongo_url, tenantDbObj[0].mongo_crt, tenantDbObj[0].mongo_db)
            let tenantDBWrite = new dbServices(tenantDbObj[0].mongo_url, tenantDbObj[0].mongo_crt, tenantDbObj[0].mongo_db)
            pool[tenantId] = { dbread: tenantDBRead, dbWrite: tenantDBWrite }
            console.log(" pool[tenantId] ::::: ", pool[tenantId])
            req.app.set("pool", pool);
        } else {
            console.log(` Tenant : ${tenantId} not found`)
            res.status(400).send({ message: "No such tenant" });
        }
    }
    next()
}

module.exports = getTenantDB
