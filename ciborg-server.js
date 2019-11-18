'use strict'

const GROUPS_DATA_HOST = 'localhost:9200'
const DEFAULT_PORT = '8080'

const http = require('http')
const boardGamesData = require('./board-games-data')()
const ciborgDB = require('./ciborg-db')(GROUPS_DATA_HOST)
const service = require('./ciborg-services')(boardGamesData,ciborgDB)
const api = require('./ciborg-web-api')(service)


const express = require('express')
const app = express()

//ADDING ROUTES AND RESPECTIVE FUNCTIONS TO THE ROUTER
/*
api.addGETRequest('/api/games/top',api.getTopGames);
api.addGETRequest('/api/games?name={}',api.getGameByName);
api.addGETRequest('/api/groups',api.getGroups);
api.addGETRequest('/api/groups?groupId={}',api.getGroupById);
api.addGETRequest('/api/groups/:groupId/games?min={}&max={}',api.getGroupGameByDuration);

api.addPOSTRequest('/api/groups',api.postGroup);

api.addPUTRequest('/api/groups/:groupId',api.putGroupInfo);
api.addPUTRequest('/api/groups/:groupId/games/',api.putGameIntoGroup);

api.addDELETERequest('/api/groups/:groupId/games?gameId={}',api.deleteGameFromGroup);
*/

app.get('/api/games/top',api.getTopGames);
app.get('/api/games?name={}',api.getGameByName);
app.get('/api/groups',api.getGroups);
app.get('/api/groups?groupId={}',api.getGroupById);
app.get('/api/groups/:groupId/games?min={}&max={}',api.getGroupGameByDuration);

app.post('/api/groups',api.postGroup);

app.put('/api/groups/:groupId',api.putGroupInfo);
app.put('/api/groups/:groupId/games/',api.putGameIntoGroup);

app.delete('/api/groups/:groupId/games?gameId={}',api.deleteGameFromGroup);

//CREATE AND INTIATE SERVER
/*
const server = http.createServer(api.processRequest);
server.listen(process.argv[2]||DEFAULT_PORT,() => console.log('Listening'));
*/

app.listen(process.argv[2]||DEFAULT_PORT,() => console.log('Listening'));
