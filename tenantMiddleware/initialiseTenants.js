/* eslint-disable no-undef */
const dbServices = require('../dbManager/dbServices');
const constants = require('../Constants/appConstants')

const getTenantDB = async function (req, res, next) {

    // Get tenantID from token
    let { tenantId } = req.query
    let pool = req.app.get("pool");
    if (pool === undefined) pool = {};
    console.log(`Checking Tenant Pool for  ::::  ${tenantId} ---> `, Boolean(pool[tenantId]))
    if (tenantId.length > 1 && !pool[tenantId]) {
        console.log(`Going Ahead with adding tenant ::${tenantId} to db pool `)
        let mongoDbUrl = constants.localUrl || process.env["MONGODB_URL"]
        let getEcamDb = new dbServices(mongoDbUrl, "", constants.globalDbName)
        let tenantDbObj = await getEcamDb.aggregateDocs(
            [{ "$match": { "_id": tenantId } }, { "$project": { "mongo_db": 1, "mongo_url": 1, "mongo_crt": 1 } }], constants.globalCollectionName)
        if (tenantDbObj !== [] && !tenantDbObj.length < 1) {
            let tenantDBRead = new dbServices(tenantDbObj[0].mongo_url, tenantDbObj[0].mongo_crt, tenantDbObj[0].mongo_db)
            let tenantDBWrite = new dbServices(tenantDbObj[0].mongo_url, tenantDbObj[0].mongo_crt, tenantDbObj[0].mongo_db)
            pool[tenantId] = { dbRead: tenantDBRead, dbWrite: tenantDBWrite }
            global.db = { tenantId: { dbRead: tenantDBRead, dbWrite: tenantDBWrite } }
            req.app.set("pool", pool);
        } else {
            console.log(` Tenant : ${tenantId} not found`)
            res.status(400).send({ message: "No such tenant" });
        }
    }
    console.log(`pool[${tenantId}] --->`, Boolean(pool[tenantId]))
    console.log(pool[tenantId])
    next()
}

module.exports = getTenantDB
