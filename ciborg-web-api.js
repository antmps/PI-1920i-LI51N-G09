'use strict'

module.exports = function (router,service) {

    //ADDING ROUTES AND RESPECTIVE FUNCTIONS TO THE ROUTER
    router.get('/games/top',getTopGames);
    router.get('/games/:name', getGameByName);
    router.get('/groups', getGroups);
    router.get('/groups/:groupId', getGroupById);
    router.get('/groups/:groupId/games', getGroupGameByDuration);

    router.post('/groups', postGroup);

    router.put('/groups/:groupId', putGroupInfo);
    router.put('/groups/:groupId/games/', putGameIntoGroup);

    router.delete('/groups/:groupId/games/:gameId', deleteGameFromGroup);


    return router

    
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

    function processResponse(res) {

        function innerProcessResponse(err, body) {

            //body is undefined meaning that there was no error but it couldnt be found
            if(body==undefined){
                res.statusCode = 404;
                res.end("404: You've reached the void.")
            }
            //there wasn't any errors during the requests
            else if (err === undefined || err===null) {
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
        service.getGameByName(req.params.name, processResponse(res))
    }

    function getGroups(req, res, params) {
        service.getGroups(processResponse(res))
    }

    function getGroupById(req, res, params) {
        //service.getGroupById(params["groupId"], processResponse(res))
        service.getGroupById(req.params.groupId, processResponse(res))
    }

    function getGroupGameByDuration(req, res, params) {
        service.getGroupGameByDuration(req.params.groupId, req.query.min, req.query.max, processResponse(res))
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
            service.putGroupInfo(req.params.groupId, req.body, processResponse(res))
        })
    }

    function putGameIntoGroup(req, res, params) {
        let body = ''
        req.on('data', (chunk) => body += chunk.toString())
        req.on('end', () => {
            req.body = JSON.parse(body.replace("\r\n", ''))
            service.putGameIntoGroup(req.params.groupId, req.body.gameId, processResponse(res))
        })
    }


    function deleteGameFromGroup(req, res, params) {
        service.deleteGameFromGroup(req.params.groupId, req.params.gameId, processResponse(res))
    }
}