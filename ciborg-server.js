'use strict'

const http = require('http');
const api = require('./ciborg-web-api');

//ADDING ROUTES AND RESPECTIVE FUNCTIONS TO THE ROUTER
api.addGETRequest('/games/top',api.getTopGames);
api.addGETRequest('/games/:name',api.getGameByName);
api.addGETRequest('/groups',api.getGroups);
api.addGETRequest('/groups/:groupId',api.getGroupById);
api.addGETRequest('/groups/:groupId/games/:min&:max',api.getGroupGameByDuration);

api.addPOSTRequest('/groups',api.postGroup);

api.addPUTRequest('/groups/:groupId',api.putGroupInfo);
api.addPUTRequest('groups/:groupId/games/:gameId',api.putGameIntoGroup);

api.addDELETERequest('/groups/:groupId/games/:gameId',api.deleteGameFromGroup);


//CREATE AND INTIATE SERVER
const server = http.createServer(api.processRequest);
server.listen('8080',() => console.log('Listening'));
