'use strict'

module.exports = function (router, service, authService) {

    //ADDING ROUTES AND RESPECTIVE FUNCTIONS TO THE ROUTER
    router.get('/games/top', getTopGames);
    router.get('/games/:name', getGameByName);
    router.get('/games/id/:id', getGameById);
    router.get('/groups', getGroups);
    router.get('/groups/:groupId', getGroupById);
    router.get('/groupsByUsername', getGroupByUsername);
    router.get('/groups/:groupId/games', getGroupGameByDuration);

    router.post('/groups', postGroup);

    router.put('/groups/:groupId', putGroupInfo);
    router.put('/groups/:groupId/games/', putGameIntoGroup);

    router.delete('/groups/:groupId/games/:gameId', deleteGameFromGroup);


    return router

    function processResponse(res) {

        function innerProcessResponse(err, body) {

            if (err) {
                //deal with error
                res.setHeader('Content-type', 'application/json')
                res.end(err.toString())
            }

            //body is undefined meaning that there was no error but it couldnt be found
            else if (body == undefined) {
                res.statusCode = 404;
                res.end("404: You've reached the void.")
            }
            //there wasn't any errors during the requests
            else {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.end(JSON.stringify(body));
            }
        }

        return innerProcessResponse

    }

    //functions that will call service
    function getTopGames(req, res) {
        service.getTopGames()
            .then((body, err) => processResponse(res)(err, body))
    }

    function getGameByName(req, res) {
        service.getGameByName(req.params.name)
            .then((body, err) => processResponse(res)(err, body))
    }

    function getGameById(req, res) {
        service.getGameById(req.params.id)
            .then((body, err) => processResponse(res)(err, body))
    }


    function getGroups(req, res) {
        service.getGroups()
            .then((body, err) => processResponse(res)(err, body))
    }

    function getGroupById(req, res) {
        service.getGroupById(req.params.groupId)
            .then((body, err) => processResponse(res)(err, body))
    }

    function getGroupByUsername(req, res) {
        service.getGroupByUsername(req.user.username)
            .then((body, err) => processResponse(res)(err, body))
    }

    function getGroupGameByDuration(req, res) {
        service.getGroupGameByDuration(req.params.groupId, req.query.min, req.query.max)
            .then((body, err) => processResponse(res)(err, body))
    }

    function postGroup(req, res) {
        req.body.username = req.user.username
        service.postGroup(req.body)
            .then((body, err) => processResponse(res)(err, body))
    }


    function putGroupInfo(req, res) {
        service.putGroupInfo(req.params.groupId, req.body)
            .then((body, err) => processResponse(res)(err, body))
    }

    function putGameIntoGroup(req, res) {
        service.putGameIntoGroup(req.params.groupId, req.body.gameId)
            .then((body, err) => processResponse(res)(err, body))
    }


    function deleteGameFromGroup(req, res) {
        service.deleteGameFromGroup(req.params.groupId, req.params.gameId)
            .then((body, err) => processResponse(res)(err, body))
            .catch(err => {
                if (err == Error("Game doesn´t exist"))
                    res.statusCode = 400
                else res.statusCode = 400
                processResponse(res)(err)
            })
    }

}