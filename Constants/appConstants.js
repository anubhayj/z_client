/** Add these variables for local setup */
//const env = 'development' /*process.env.NODE_ENV || 'production'*/

const config = {
    development: {
        APIKey: 'chs6009CSnOAFbwUyCoVzQ',
        APISecret: 'lbQUT5ItU6WCyjhe2AAk98TWbOif4xarP7bK'
    },
    localUrl: "mongodb://127.0.0.1:27017/",
    globalDbName: "ZoomClients",
    globalCollectionName: "clients"
};

module.exports = config