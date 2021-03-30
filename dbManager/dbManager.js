/* eslint-disable no-undef */
/**
 * Licensed Material - Property of anubhayj@gmail.com
 */

const MongoClient = require("mongodb").MongoClient;

class DbManager {
    constructor(url, cert, dbname) {
        this.url = url;
        this.cert = cert;
        this.DbName = dbname;
        this.db = null;
    }

    async connectToGlobalDb() {
        if (!this.url) {
            return null;
        }
        if (this.db) return this.db;
        let options = {
            useUnifiedTopology: true
        };
        //options = helpers.getMongoCertificate(this.cert);
        options["useNewUrlParser"] = true;
        const client = await MongoClient.connect(this.url, options);
        return client.db(this.DbName);
    }

    async getDb() {
        this.db = await this.connectToGlobalDb();
        if (!this.db) {
            return [];
        }
        return this.db;
    }

}

module.exports = DbManager;
