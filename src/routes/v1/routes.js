/* eslint-disable no-undef */
const router = require('express').Router();
const routeMiddleWares = require('./routesMiddleware')
const { dailyUsagePipeline, userWiseReport, datewiseReport, teamWiseReport, teamAndOtherDimension } = require('../../../postEnrichmentPipelines/postProcessPipelines');
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

    if (reportModel === 'dailyUsage') {
        data = await dbRead.aggregateDocs(dailyUsagePipeline, "DailyUsage")
    }

    if (reportModel === 'userWiseReport') {
        data = await dbRead.aggregateDocs(userWiseReport, "userWiseMeetingReport")
    }

    if (reportModel === 'dateWise') {
        data = await dbRead.aggregateDocs(datewiseReport, "userWiseMeetingReport")
    }

    if (reportModel === 'teamWise') {
        data = await dbRead.aggregateDocs(teamWiseReport, "userWiseMeetingReport")
    }

    if (reportModel === 'teamAndOtherDimension') {
        data = await dbRead.aggregateDocs(teamAndOtherDimension, "userWiseMeetingReport")
    }

    res.status(200).send(data)
});


module.exports = router;

/**
 * 1.) Scheduling jobs
 * 2.) Loading data into db
 */