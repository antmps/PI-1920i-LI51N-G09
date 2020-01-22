'use strict'

const GROUPS_DATA_HOST = 'localhost:9200'
const DEFAULT_PORT = '8080'

const ciborgDB = require('./ciborg-db')(GROUPS_DATA_HOST)
const authService = require('./auth-service')(ciborgDB)

const expressSession = require('express-session')

const express = require('express');
const app = express();

const boardGamesData = require('./board-games-data')()
const service = require('./ciborg-services')(boardGamesData, ciborgDB)
const api = require('./ciborg-web-api')(express.Router(), service, authService)

//USE THE WEBAPI
app.use(expressSession({
  secret: 'keyboard cat'
}))
app.use(express.json())
app.use('/', express.static('app'))

const authApi = require('./auth-web-api')(app, express.Router(), authService)
app.use('/api', api);
app.use('/api/auth', authApi)

//CREATE AND INTIATE SERVER
//const server = http.createServer(api.processRequest);
app.listen(process.argv[2] || DEFAULT_PORT, () => console.log('Listening'));
