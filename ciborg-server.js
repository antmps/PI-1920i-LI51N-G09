'use strict'

const http = require('http');
const router = require('./router');
const service = require('./ciborg-services');


//ADDING ROUTES AND RESPECTIVE FUNCTIONS TO THE ROUTER
router.getRoute('/games/top',getTopGames);
router.getRoute('/games/:name',getGameByName);
router.getRoute('/groups',getGroups);
router.getRoute('/groups/:groupId',getGroupById);
router.getRoute('/groups/:groupId/games/:min&:max',getGroupGameByDuration);

router.postRoute('/groups',postGroup);

router.putRoute('/groups/:groupId',putGroupInfo);
router.putRoute('groups/:groupId/games/:gameId',putGameIntoGroup);

router.deleteRoute('/groups/:groupId/games/:gameId',deleteGameFromGroup);


//CREATE AND INTIATE SERVER
const server = http.createServer(router);
server.listen('8080',() => console.log('Listening'));


//FUNCTIONS TO HANDLE HTML
function getTopGames(req, res){
    service.getTopGames(processGetTopGames);

    function processGetTopGames(err, games ){
        res.setHeader('Content-type','application/json');
        res.end(JSON.stringify(games));
    }
}

function getGameByName(req, res){}

function getGroups(req, res){}

function getGroupById(req, res){}

function getGroupGameByDuration(req, res){}


function postGroup(req, res){}


function putGroupInfo(req, res){}

function putGameIntoGroup(req, res){}


function deleteGameFromGroup(req, res){}

