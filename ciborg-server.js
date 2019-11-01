'use strict'

const http = require('http');
const api = require('./ciborg-web-api');

//ADDING ROUTES AND RESPECTIVE FUNCTIONS TO THE ROUTER
api.addGETRequest('/api/games/top',api.getTopGames);
api.addGETRequest('/api/games?name={}',api.getGameByName);
api.addGETRequest('/api/groups',api.getGroups);
api.addGETRequest('/api/groups?groupId={}',api.getGroupById);
api.addGETRequest('/api/groups/:groupId/games?min={}&max={}',api.getGroupGameByDuration);

api.addPOSTRequest('/api/groups',api.postGroup);

api.addPUTRequest('/api/groups/:groupId',api.putGroupInfo);
api.addPUTRequest('/api/groups/:groupId/games/',api.putGameIntoGroup);

api.addDELETERequest('/api/groups/:groupId/games?gameId={}',api.deleteGameFromGroup);


//CREATE AND INTIATE SERVER
const server = http.createServer(api.processRequest);
server.listen('8080',() => console.log('Listening'));
