const tasks = require("../../../IngestionController/ingest")
module.exports = function ingest(req, res) {
    tasks(req, res)
}


