'use strict'

const router = require('./router')

function processRequest(req,res){
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);

    if(getFunc(req.method, req.url)==undefined){
        res.setHeader("Status","404 Not Found")
        res.end()
        return
    } 

    res.setHeader("Content-Type","application/json");
    res.end(JSON.stringify({name:"book1"}));
}


function addGETRequest(route, func){
    router.getRoute(route,func)
}

function addPOSTRequest(route, func){
    router.postRoute(route,func)
}

function addPUTRequest(route, func){
    router.putRoute(route,func)
}

function addDELETERequest(route, func){
    router.deleteRoute(route,func)
}


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


module.exports.processRequest = processRequest
module.exports.addGETRequest = addGETRequest
module.exports.addPOSTRequest = addPOSTRequest
module.exports.addPUTRequest = addPUTRequest
module.exports.addDELETERequest = addDELETERequest

module.exports.getTopGames = getTopGames
module.exports.getGameByName = getGameByName
module.exports.getGroups = getGroups
module.exports.getGroupById = getGroupById
module.exports.getGroupGameByDuration = getGroupGameByDuration
module.exports.postGroup = postGroup
module.exports.putGroupInfo = putGroupInfo
module.exports.putGameIntoGroup = putGameIntoGroup
module.exports.deleteGameFromGroup = deleteGameFromGroup
