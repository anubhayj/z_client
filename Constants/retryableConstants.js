//MongoRetrableDefaults
/**
 * Licensed Material - Property of anubhayj@gmail.com
 */
module.exports = {
    MONGO_RETRYABLE_DEFAULTS: {
        retries: 5,
        factor: 1.25,
        minTimeout: 5 * 1000,
        maxTimeout: 120 * 1000,
    },
    RETRYABLE_ERROR_CODES: new Set([
        6, // HostUnreachable
        7, // HostNotFound
        89, // NetworkTimeout
        91, // ShutdownInProgress
        189, // PrimarySteppedDown
        9001, // SocketException
        10107, // NotMaster
        11600, // InterruptedAtShutdown
        11602, // InterruptedDueToReplStateChange
        13435, // NotMasterNoSlaveOk
        13436, // NotMasterOrSecondary
        262, // ExceededTimeLimit
    ]),
}