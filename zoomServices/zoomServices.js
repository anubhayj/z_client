/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const jwt = require('jsonwebtoken');
const helpers = require("../utils/helper")
const config = require('../Constants/appConstants')
const daily_report = require("../IngestionController/daily_meeting")
const userWiseMeetingReport = require("../IngestionController/userwise_meeting_report")


/**
 * 
 * @param {*} tenantId 
 * @returns 
 */
async function authToken(tenantId = "") {
    let payload = {
        iss: config.development.APIKey, //TODO : Make it dynamic
        exp: ((new Date()).getTime() + 5000)
    };
    let token = jwt.sign(payload, config.development.APISecret);
    return token
}

/**
 * 
 * @param {*} email_Id 
 * @param {*} tenantId 
 * @returns 
 */
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

/**
 * @param {*} days : 
 * 
 * @returns 
 */
function usageReports(days) {

    console.time("Generating_usageReport")
    console.log(" :::: Generating usageReport :::: \n")
    let data = daily_report(days)
    console.timeEnd("Generating_usageReport")

    return data
}

/**
 * 
 * @param {*} days 
 * @returns 
 */
function userWiseMeetingReports(days) {

    console.time("Generating_userWiseMeetingReport")
    console.log("::: Generating userWiseMeetingReport :::: \n")
    let data = userWiseMeetingReport(days)
    console.timeEnd("Generating_userWiseMeetingReport")

    return data
}

module.exports = {
    getAccountDetails: getAccountDetails,
    usageReports: usageReports,
    userWiseMeetingReports: userWiseMeetingReports
}

