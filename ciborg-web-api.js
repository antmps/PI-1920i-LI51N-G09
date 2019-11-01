'use strict'

const router = require('./router')
const service = require('./ciborg-services')

function processRequest(req,res){
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);

    var func = router.getFunc(req.method, req.url)

    if(func==undefined){
        res.statusCode = 404
        res.end()
        return
    } 

    func(req,res)
}

//add requests to router
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

//functions that will call service
function getTopGames(req, res){
    functionalRequest(req,res)
    /*service.getTopGames(processGetTopGames);

    function processGetTopGames(err, games ){
        res.setHeader('Content-type','application/json');
        res.end(JSON.stringify(games));
    }*/
}

function getGameByName(req, res){
    functionalRequest(req,res)
}

function getGroups(req, res){
    functionalRequest(req,res)
}

function getGroupById(req, res){
    functionalRequest(req,res)
}

function getGroupGameByDuration(req, res){
    functionalRequest(req,res)
}


function postGroup(req, res){
    functionalRequest(req,res)
}


function putGroupInfo(req, res){
    functionalRequest(req,res)
}

function putGameIntoGroup(req, res){
    functionalRequest(req,res)
}


function deleteGameFromGroup(req, res){
    functionalRequest(req,res)
}

function functionalRequest(req,res){
    res.statusCode = 200
    res.setHeader('Content-type','application/json');
    res.end(JSON.stringify(req.url));
}


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
