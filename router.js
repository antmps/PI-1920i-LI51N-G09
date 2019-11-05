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

    function getFunc(method, url){
        switch(method){
            case "GET":
                return searchArray(getArray,url)
            case "POST":
                return searchArray(postArray,url)
            case "PUT":
                return searchArray(putArray,url)
            case "DELETE":
                return searchArray(deleteArray,url)
        }
        return undefined
    }

    function searchArray(array,url){
        var toRet = {func : undefined, params :{}}
        var index = 0
        while(index<array.length){
            var path = array[index].path
            toRet.func = array[index].handler

            var idx = 0
            var pathSplit = path.split("/").filter(function(str){return str != ""})
            var urlSplit = url.split("/").filter(function(str){return str != ""})

            if(pathSplit.length==urlSplit.length){//paths must have same length to check for compatibility
                
                var length = urlSplit.length
                while(idx<length){
                    
                    //check for variable
                    if(pathSplit[idx].includes(":")){
                        
                        let param = pathSplit[idx].replace(':','')
                        let value = urlSplit[idx]
                        toRet.params[param] = value
                        idx++
                        continue
                    }
                    
                    //check for query
                    if(pathSplit[idx].includes("?") & urlSplit[idx].includes("?")){
                        
                        var pathQuery = pathSplit[idx].split("?")
                        var urlQuery = urlSplit[idx].split("?")

                        //check if the query is in the same path
                        if(pathQuery[0]!=urlQuery[0]) break;

                        //check if query params are the same
                        var pathParams = pathQuery[1].split("&")
                        var urlParams = urlQuery[1].split("&")

                        //doesnt have the same number of params
                        if(pathParams.length != urlParams.length) break

                        var i = 0
                        while(i<urlParams.length){

                            var pParam = pathParams[i].split("=")
                            var uParam = urlParams[i].split("=")

                            if(pParam[0]!=uParam[0])break
                            toRet.params[uParam[0]]=uParam[1]
                            i++
                        }
                        
                        if(i!=pathParams.length)return undefined

                        idx++
                        continue
                    }
                    if(pathSplit[idx]==urlSplit[idx]){
                        idx++
                        continue
                    }

                    //path wasnt compatible
                    break
                }

                if(idx == length) return toRet
            }
            index++

        }
        return undefined
    }

module.exports.getRoute = getRoute;
module.exports.postRoute = postRoute;
module.exports.deleteRoute = deleteRoute;
module.exports.putRoute = putRoute;
module.exports.getFunc = getFunc;