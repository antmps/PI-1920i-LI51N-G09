'use strict'

const router = require('./router')
const service = require('./ciborg-services')

function processRequest(req, res) {
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);

    var funcParam = router.getFunc(req.method, req.url)

    if (funcParam == undefined || funcParam.func == undefined) {
        res.statusCode = 404
        res.end()
        return
    }

    let func = funcParam.func

    func(req, res, funcParam.params)
}

//add requests to router
function addGETRequest(route, func) {
    router.getRoute(route, func)
}
function addPOSTRequest(route, func) {
    router.postRoute(route, func)
}
function addPUTRequest(route, func) {
    router.putRoute(route, func)
}
function addDELETERequest(route, func) {
    router.deleteRoute(route, func)
}

//functions that will call service
function getTopGames(req, res, params) {

    service.getTopGames(processGames);

}

function getGameByName(req, res, params) {

    service.getGameByName(params["name"], processGames)

}

function getGroups(req, res) {
    service.getGroups(processGames)
}

function getGroupById(req, res, params) {
    service.getGroupById(params["groupId"],processGames)
}

function getGroupGameByDuration(req, res, params) {
    functionalRequest(req, res)
}


function postGroup(req, res) {
    functionalRequest(req, res)
}


function putGroupInfo(req, res, params) {
    functionalRequest(req, res)
}

function putGameIntoGroup(req, res, params) {
    functionalRequest(req, res)
}


function deleteGameFromGroup(req, res, params) {
    functionalRequest(req, res)
}

function functionalRequest(req, res) {
    res.statusCode = 200
    res.setHeader('Content-type', 'application/json')
    res.end(JSON.stringify(req.url))
}

function addBodyToRequest(req) {
    let body = ''
    req.on('data', (chunk) => body += chunk.toString())
    req.body = body
}

function processGames(err, games) {
    if (err == undefined) {
        res.setHeader('Content-type', 'application/json');
        res.end(JSON.stringify(games));
    }

    //deal with error

}

module.exports = {
    processRequest: processRequest,
    addGETRequest: addGETRequest,
    addPOSTRequest: addPOSTRequest,
    addPUTRequest: addPUTRequest,
    addDELETERequest: addDELETERequest,
    getTopGames: getTopGames,
    getGameByName: getGameByName,
    getGroups: getGroups,
    getGroupById: getGroupById,
    getGroupGameByDuration: getGroupGameByDuration,
    postGroup: postGroup,
    putGroupInfo: putGroupInfo,
    putGameIntoGroup: putGameIntoGroup,
    deleteGameFromGroup: deleteGameFromGroup
}