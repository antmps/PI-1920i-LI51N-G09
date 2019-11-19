'use strict'


module.exports = function (boardGamesData, ciborgDb) {

    return {
        getTopGames: getTopGames,
        getGameByName: getGameByName,
        getGroups: getGroups,
        getGroupById: getGroupById,
        getGroupGameByDuration: getGroupGameByDuration,

        postGroup: postGroup,

        putGroupInfo: putGroupInfo,
        putGameIntoGroup: putGameIntoGroup,

        deleteGameFromGroup: deleteGameFromGroup
    };

    function getTopGames(cb) {
        boardGamesData.getTopGames(cb);
    }

    function getGameByName(name, cb) {
        boardGamesData.getGameByName(name, cb);
    }

    function getGroups(cb) {
        ciborgDb.getGroups(cb);
        /*
        
        */
    }

    function getGroupById(groupId, cb) {
        ciborgDb.getGroupsById(groupId, cb);
    }

    function getGroupGameByDuration(groupId, min, max, cb) {
        ciborgDb.getGroupGameByDuration(groupId, min, max, cb);
    }


    function postGroup(body, cb) {
        ciborgDb.postGroup(body, cb);
    }

    function putGroupInfo(groupId, body, cb) {

        ciborgDb.getGamesFromGroup(groupId, (err,arrayBody) =>{

            if(err!=undefined) cb(err,arrayBody);

            ciborgDb.putGroupInfo(groupId, arrayBody, body, cb);
        });
    }

    function putGameIntoGroup(groupId, gameId, cb) {

        boardGamesData.getGameById(gameId, (err, gameBody) => {

            if (err) cb(err, gameBody);
            ciborgDb.getGroupsById(groupId,(err, groupBody) =>{
        
                if(err) cb(err,groupBody);
                
                groupBody.games.push(boardGamesData.getGameBasicInfo(gameBody.games[0]))
                //jsonArray = JSON.parse(array)

               ciborgDb.putGameIntoGroup(groupBody, groupId, cb); 
            });

        });
    }

    function deleteGameFromGroup(groupId, gameId, cb) {

        //get current _sorce from group
        ciborgDb.getGroupsById(groupId,(err,groupBody)=>{
            if(err)cb(err,groupBody)

            //remove game with the same ID
            var size = groupBody.games.length
            var array = []

            for(var i = 0; i<size;i++){
                if(groupBody.games[i].id != gameId)
                    array.push(groupBody.games[i])
            }

            groupBody.games = array

            if(size!=array.length)ciborgDb.deleteGameFromGroup(groupId, groupBody, cb);
            else cb(new Error("Game doesn´t exist"),groupBody)
        })
        
    }
}