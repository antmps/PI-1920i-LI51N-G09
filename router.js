'use strict'

    let getArray = [];
    let postArray = [];
    let deleteArray = [];
    let putArray = [];

    function getRoute(route,func){
        getArray.push({path : route, handler : func});
    }

    function postRoute(route,func) {
        postArray.push({path : route, handler : func});
    }

    function deleteRoute(route,func) {
        deleteArray.push({path : route, handler : func});
    }

    function putRoute(route,func) {
        putArray.push({path : route, handler : func});
    }

    function processRequest(req,res){
        console.log(req.method);
        console.log(req.url);
        console.log(req.headers);

        res.setHeader("Content-Type","application/json");
        res.end(JSON.stringify({name:"book1"}));
    }

module.exports.getRoute = getRoute;
module.exports.postRoute = postRoute;
module.exports.deleteRoute = deleteRoute;
module.exports.putRoute = putRoute;
module.exports.processRequest = processRequest;