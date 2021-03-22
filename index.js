/* eslint-disable no-undef */

require('express-async-errors');
const express = require('express');
const app = express();
const routes = require('./src/routes/v1/routes') //('./src/routes/v1/routes');
const bodyParser = require("body-parser");
const config = require('./Constants/appConstants');

app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.json())
const getTenantDB = require('./tenantMiddleware/initialiseTenants')
app.use(getTenantDB);
//Initate Application
app.use('/', routes);
app.listen(9099, function () {
    console.log(`App listening on port ${9099}!`)
});

