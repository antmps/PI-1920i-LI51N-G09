'use strict'
const router = require('./router')

module.exports = function (service) {
    return {
        processRequest: processResponse,
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

    function processResponse(req, res) {
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
        service.getTopGames(processResponse);
    }

    function getGameByName(req, res, params) {
        service.getGameByName(params["name"], processResponse)
    }

    function getGroups(req, res) {
        service.getGroups(processResponse)
    }

    function getGroupById(req, res, params) {
        service.getGroupById(params["groupId"], processResponse)
    }

    function getGroupGameByDuration(req, res, params) {
        service.getGroupGameByDuration(params["groupId"], params["min"], params["max"], processResponse)
    }


    function postGroup(req, res) {
        addBodyToRequest(req)
        service.postGroup(req.body.groupName, req.body.description, processResponse)
    }


    function putGroupInfo(req, res, params) {
        addBodyToRequest(req)
        service.putGroupInfo(params["groupId"], req.body.groupName, req.body.description, processResponse)
    }

    function putGameIntoGroup(req, res, params) {
        addBodyToRequest(req)
        service.putGroupInfo(params["groupId"], req.body.id, processResponse)
    }


    function deleteGameFromGroup(req, res, params) {
        service.putGroupInfo(params["groupId"], req.body.id, processResponse)
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

    function processResponse(err, body) {
        if (err == undefined) {
            res.setHeader('Content-type', 'application/json');
            res.end(JSON.stringify(body));
        }

        //deal with error

    }
}