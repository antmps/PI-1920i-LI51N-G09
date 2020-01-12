'use strict'

const GROUPS_DATA_HOST = 'localhost:9200'
const DEFAULT_PORT = '8080'

const expressSession = require('express-session')

const express = require('express');
const app = express();

const ciborgDB = require('./ciborg-db')(GROUPS_DATA_HOST)
const authService = require('./auth-service')(ciborgDB)
const authApi = require('./auth-web-api')(app, express.Router(), authService)
const boardGamesData = require('./board-games-data')()
const service = require('./ciborg-services')(boardGamesData,ciborgDB)
const api = require('./ciborg-web-api')(express.Router(),service)

//USE THE WEBAPI
app.use(expressSession({ secret: 'keyboard cat' }))
app.use(express.json())
app.use('/', express.static('app'))
app.use('/api',api);
app.use('/api/auth',authApi)
app.use('/api/groups', verifyAuthenticated, api)

//CREATE AND INTIATE SERVER
//const server = http.createServer(api.processRequest);
app.listen(process.argv[2]||DEFAULT_PORT,() => console.log('Listening'));

function verifyAuthenticated(req, rsp, next) {
    if(req.isAuthenticated())
      return next()
    rsp.status(403).json({message:"Not Authenticated"})
  }
