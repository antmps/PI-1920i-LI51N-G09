'use strict'
const router = require('./router')

module.exports = function (service) {
    return {
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

    function processRequest(req, res) {
        console.log(req.method);
        console.log(req.url);
        console.log(req.headers);

        var funcParam = router.getFunc(req.method, req.url)

        if (funcParam == undefined || funcParam.func == undefined) {
            res.statusCode = 404
            res.end("404: You've reached the void.")
            return
        }

        let func = funcParam.func
        try {
            func(req, res, funcParam.params)
        }
        catch (err) {
            res.statusCode = 500
            res.end("500: At least we tried.")
            return
        }
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

    function processResponse(res) {

        function innerProcessResponse(err, body) {

            //body is undefined meaning that there was no error but it couldnt be found
            if(body==undefined){
                res.statusCode = 404;
                res.end("404: You've reached the void.")
            }
            //there wasn't any errors during the requests
            else if (err != undefined) {
                res.setHeader('Content-type', 'application/json');
                res.end(JSON.stringify(body));
            }
            else {
                //deal with error
                res.setHeader('Content-type', 'application/json');
                res.end(JSON.stringify(err));
            }
        }

        return innerProcessResponse
    }

    //functions that will call service
    function getTopGames(req, res, params) {
        service.getTopGames(processResponse(res));

    }

    function getGameByName(req, res, params) {
        service.getGameByName(params["name"], processResponse(res))
    }

    function getGroups(req, res, params) {
        service.getGroups(processResponse(res))
    }

    function getGroupById(req, res, params) {
        service.getGroupById(params["groupId"], processResponse(res))
    }

    function getGroupGameByDuration(req, res, params) {
        service.getGroupGameByDuration(params["groupId"], params["min"], params["max"], processResponse(res))
    }

    function postGroup(req, res, params) {
        let body = ''
        req.on('data', (chunk) => body += chunk.toString())
        req.on('end', () => {
            req.body = JSON.parse(body.replace("\r\n", ''))
            service.postGroup(req.body, processResponse(res))
        })
    }


    function putGroupInfo(req, res, params) {
        let body = ''
        req.on('data', (chunk) => body += chunk.toString())
        req.on('end', () => {
            req.body = JSON.parse(body.replace("\r\n", ''))
            service.putGroupInfo(params["groupId"], req.body, processResponse(res))
        })
    }

    function putGameIntoGroup(req, res, params) {
        let body = ''
        req.on('data', (chunk) => body += chunk.toString())
        req.on('end', () => {
            req.body = JSON.parse(body.replace("\r\n", ''))
            service.putGameIntoGroup(params["groupId"], req.body.gameId, processResponse(res))
        })
    }


    function deleteGameFromGroup(req, res, params) {
        service.deleteGameFromGroup(params["groupId"], params["gameId"], processResponse(res))
    }
}