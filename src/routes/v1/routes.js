/* eslint-disable no-undef */
const router = require('express').Router();
const routeMiddleWares = require('../../routes/v1/routesMiddleWare')
const coreServices = require('../../../zoomServices/zoomServices')


router.post('/api/v1/userinfo', async function (req, res) {
    console.log(`Post Called ::::::: --> /api/v1/userinfo `)
    routeMiddleWares.V1AccountsPostMiddleware(req, res)
});

router.post('/api/v1/postRoute2', async function (req, res) {
    let { type } = req.params;
    console.log(`Caller type  ---> ${type}`)
    console.log(`Post Called ${type}::::::: --> /api/v1/:tenantId/entity/${type} `)
    routeMiddleWares.V1EntityPostMiddleware(req, res)
});

router.post('/api/v1/postRoute3', async function (req, res) {
    let { type } = req.params;
    console.log(`Caller type  ---> ${type}`)
    console.log(`Post Called ${type}::::::: --> /api/v1/:tenantId/entity/${type} `)
    routeMiddleWares.V1EntityPostMiddleware(req, res)
});



module.exports = router;

/**
 * 1.) Scheduling jobs
 * 2.) Loading data into db
 */