const axios = require('axios');
const https = require('https');

function createResponseObject(data, statusCode) {
    return { data: data, statusCode: statusCode }
}

async function makeRequest(method, url, data, options) {
    let res = null;
    try {
        updateAxiosAgent(options);
        console.log(`Making ${method} to ${url}`);
        switch (method.toUpperCase()) {
            case 'POST':
                res = await axios.post(url, data, options);
                break;
            case 'PUT':
                res = await axios.put(url, data, options);
                break;
            case 'GET':
                res = await axios.get(url, options);
                break;
            default:
                logger.error(`Not a valid method, valid methods POST, PUT, GET`);
        }
        return res;
    } catch (e) {
        console.error(`Error Occured ::::  ${e}`)
        throw axiosErrorHelper(e);
    }
}

function axiosErrorHelper(error) {
    console.log("Error Occurred :::: ", error)
    let errMsg = { data: error.message, status: "400" }
    if (error.response && error.response.data.message) {
        errMsg.data = error.response.data
        errMsg.status = error.response.status
    }
    return errMsg
}

function updateAxiosAgent(options) {
    try {
        const agent = new https.Agent({
            rejectUnauthorized: false
        });
        options.httpsAgent = agent;
    } catch (error) {
        console.log("error", error)
    }
}

module.exports = {
    createResponseObject: createResponseObject,
    makeRequest: makeRequest
}
