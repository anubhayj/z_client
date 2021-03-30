/* eslint-disable no-undef */
const router = require('express').Router();
const routeMiddleWares = require('./routesMiddleWare')
const { dailyUsagePipeline, userWiseReport } = require('../../../postEnrichmentPipelines/postProcessPipelines');
const { report } = require('../../../Enrichment/routes/v1/routes');


router.post('/api/v1/userinfo', async function (req, res) {
    console.log(`Post Called ::::::: --> /api/v1/userinfo `)
    routeMiddleWares.V1AccountsPostMiddleware(req, res)
});

router.get('/api/v1/:_id', async function (req, res) {
    let { tenantId } = req.query
    let reportModel = req.params._id
    let dbRead = req.app.get("pool")[tenantId].dbWrite
    let data = ""
    console.log("reportModel ::::: ", reportModel)

    if (reportModel === 'dailyUsagePipeline') {
        console.log(`Serving daily usage data to UI ::::::: --> /api/v1/userinfo `)
        data = await dbRead.aggregateDocs(dailyUsagePipeline, "DailyUsage")
    }
    if (reportModel === 'userWiseReport') {
        console.log(`Serving daily usage data to UI ::::::: --> /api/v1/userinfo `)
        data = await dbRead.aggregateDocs(userWiseReport, "userWiseMeetingReport")
    }

    res.status(200).send(data)
});


module.exports = router;

/**
 * 1.) Scheduling jobs
 * 2.) Loading data into db
 */