/* eslint-disable no-undef */
const router = require('express').Router();
const ingest = require('./routesMiddleware')
const postProcess = require('../../../postEnrichmentPipelines/postProcessPipelines')


router.post('/orc/v1/ingest', async function (req, res) {
    /** TODO : check if other job is running else donot start */
    ingest(req, res)
    //postProcess(req)
    res.status(200).send("Job Submitted");
});



module.exports = router;