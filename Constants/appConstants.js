/** Add these variables for local setup */
//const env = 'development' /*process.env.NODE_ENV || 'production'*/

const config = {
    development: {
        APIKey: 'your-key-here',
        APISecret: 'your-key-here'
    },
    localUrl: "mongodb://127.0.0.1:27017/",
    globalDbName: "ZoomClients",
    globalCollectionName: "clients"
};

module.exports = config
