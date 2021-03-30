/* eslint-disable no-undef */

require('express-async-errors');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const config = require('../Constants/appConstants');
const routes = require('./routes/v1/routes')
const task = require('../TaskManager/scheduler');
const port = 8080

app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.json())
const getTenantDB = require('../tenantMiddleware/initialiseTenants')
app.use(getTenantDB);
//Initate Application
app.use('/', routes);

// cron is already set or not
//

app.listen(port, function () {
    console.log(`App listening on port ${port}!`)
});

