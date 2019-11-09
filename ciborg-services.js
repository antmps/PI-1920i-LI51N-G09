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

        deleteGameFromGroup: deleteGameFromGroup,

        getGamesFromGroup: getGamesFromGroup
    };

    function getTopGames(cb) {
        boardGamesData.getTopGames(cb);
    }

    function getGameByName(name, cb) {
        boardGamesData.getGameByName(name, cb);
    }

    function getGroups(cb) {
        ciborgDb.getGroups(cb);
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
        ciborgDb.putGroupInfo(groupId, getGamesFromGroup(groupId,cb), body, cb);
    }

    function putGameIntoGroup(groupId, gameId, cb) {

        boardGamesData.getGameById(gameId, (err, body) => {

            if (err!=undefined) cb(err, body)

            ciborgDb.putGameIntoGroup(body, groupId, cb);

        });
    }


    function deleteGameFromGroup(groupId, gameId, cb) {
        ciborgDb.deleteGameFromGroup(groupId, gameId, cb);
    }

    function getGamesFromGroup(groupId,cb){
        ciborgDb.getGamesFromGroup(groupId,cb);
    }
}