/**
 * Licensed Material - Property of anubhayj@gmail.com
 * TODO : encapsulate db calls in this func 
 */
const retry = require("retry");
const path = require("path");
const log4js = require("log4js");
const logger = log4js.getLogger(path.basename(__filename));
logger.level = "debug";


const { MongoError, MongoNetworkError } = require("mongodb");

const {
    MONGO_RETRYABLE_DEFAULTS,
    RETRYABLE_ERROR_CODES,
} = require("../Constants/retryableConstants");

/**
 * Determines whether an error is something the driver should attempt to retry
 *
 * @param {MongoError|Error} error
 */
function isRetryableError(error) {
    return (
        RETRYABLE_ERROR_CODES.has(error.code) ||
        error instanceof MongoNetworkError ||
        error.message.match(/not master/) ||
        error.message.match(/node is recovering/)
    );
}

let RETRYABLE_PROMISE_WRAPPER = {
    promiseFuncWrapper: (promiseFunc, count) => {
        return promiseFunc(count);
    },
};

function MONGO_RETRYABLE(promiseFunc, retryOptions = MONGO_RETRYABLE_DEFAULTS) {
    return new Promise((resolve, reject) => {
        var operation = retry.operation(retryOptions);
        operation.attempt(function (count) {
            RETRYABLE_PROMISE_WRAPPER.promiseFuncWrapper(promiseFunc, count)
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    var isRetryable = isRetryableError(error);
                    if (isRetryable) {
                        logger.error(
                            `Error: ${JSON.stringify(error)}; retrying-- attempt #${count}/${retryOptions["retries"]
                            }`
                        );
                        if (operation.retry(error)) {
                            return;
                        }
                    }
                    reject(error);
                });
        });
    });
}

module.exports = {
    MONGO_RETRYABLE,
};
