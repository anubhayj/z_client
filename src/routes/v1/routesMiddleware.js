/* eslint-disable no-undef */
const { createResponseObject, mapFields } = require('../../../utils/helper');
const { getAccountDetails } = require('../../../zoomServices/zoomServices')
var ObjectID = require('mongodb').ObjectID

async function V1AccountsPostMiddleware(req, res) {
    let resp = {}
    let { tenantId, email_Id } = req.query
    console.log(` tenantId  ${tenantId} ---- email_id ${email_Id}`)
    try {
        //Get account details
        let fetchedAccounts = await getAccountDetails(email_Id, tenantId)
        console.log("Response ", fetchedAccounts)
        resp = createResponseObject(fetchedAccounts, 200)
        res.status(resp.statusCode).send(resp.data);
    } catch (error) {
        console.log("Error --------------->")
        console.error(error.message)
        res.status(resp.statusCode).send(resp.data);
    }
    return;
}

module.exports = {
    V1AccountsPostMiddleware: V1AccountsPostMiddleware
}
