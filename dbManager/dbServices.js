/* eslint-disable no-undef */
const dbManager = require('./dbManager')
class DbServices {

    constructor(url, cert, dbname, db) {
        this.url = url;
        this.cert = cert;
        this.DbName = dbname;
        this.db = db;
    }

    async getDB() {
        if (this.db) {
            return this.db;
        }
        let dbmanager = new dbManager(this.url, "", this.DbName);
        this.db = await dbmanager.getDb()
        return this.db
    }

    async insertDocs(docs, collectionName) {
        try {
            let db = await this.getDB();
            let data = await db.collection(collectionName).insertMany(docs, { ordered: false });
            return data;
        } catch (error) {
            console.log("Exception Occured ::: ", error.message)
        }
    }

    async insertDoc(doc, collectionName) {
        let db = await this.getDB();
        let data = await db.collection(collectionName).insertOne(doc);
        return data;
    }

    async findDoc(filter, collectionName) {
        let db = await this.getDB();
        let data = await db.collection(collectionName).findOne(filter);
        return data;
    }

    async aggregateDocs(pipeline, collectionName) {
        let db = await this.getDB();
        let data = await db.collection(collectionName).aggregate(pipeline).toArray();
        return data
    }

    async updateDoc(filter, document, collectionName) {
        let db = await this.getDB();
        let data = await db.collection(collectionName).updateOne(filter, { $set: document });
        return data;
    }

    async deleteDoc(filter, collectionName) {
        let db = await this.getDB();
        let data = await db.collection(collectionName).deleteOne(filter);
        return data;
    }

}

module.exports = DbServices
