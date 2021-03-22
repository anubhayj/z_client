/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const jwt = require('jsonwebtoken');
const helpers = require("../utils/helper")
const config = require('../Constants/appConstants')

/** This function will be made dynamic */
async function authToken(tenantId = "") {
    let payload = {
        iss: config.development.APIKey, //TODO : Make it dynamic
        exp: ((new Date()).getTime() + 5000)
    };
    let token = jwt.sign(payload, config.development.APISecret);
    return token
}

async function getAccountDetails(email_Id, tenantId) {
    let token = await authToken(tenantId)
    let url = 'https://api.zoom.us/v2/users'
    url = email_Id ? url + `/${email_Id}` : url
    var options = {
        headers: {
            "Authorization": `Bearer ${token}`,
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json'
        },
        params: { status: 'active' },
        json: true
    }
    let response = await helpers.makeRequest("GET", url, " ", options)
    return response.data
}



module.exports = {
    getAccountDetails: getAccountDetails
}



