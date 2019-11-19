'use strict'

const GROUPS_DATA_HOST = 'localhost:9200'
const DEFAULT_PORT = '8080'

const express = require('express');
const app = express();

const boardGamesData = require('./board-games-data')()
const ciborgDB = require('./ciborg-db')(GROUPS_DATA_HOST)
const service = require('./ciborg-services')(boardGamesData,ciborgDB)
const api = require('./ciborg-web-api')(express.Router(),service)

//USE THE WEBAPI
app.use('/api',api);

//CREATE AND INTIATE SERVER
//const server = http.createServer(api.processRequest);
app.listen(process.argv[2]||DEFAULT_PORT,() => console.log('Listening'));
