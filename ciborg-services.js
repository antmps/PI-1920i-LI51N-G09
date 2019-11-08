'use strict'


module.exports = function (boardGamesData, ciborgDb) {

    return {
        getTopGames : getTopGames,
        getGameByName : getGameByName,
        getGroups : getGroups,
        getGroupById : getGroupById,
        getGroupGameByDuration : getGroupGameByDuration,

        postGroup : postGroup,

        putGroupInfo : putGroupInfo,
        putGameIntoGroup : putGameIntoGroup,

        deleteGameFromGroup : deleteGameFromGroup
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


    function postGroup(groupName, description, cb) {
        ciborgDb.postGroup(groupName, description, cb);
    }


    function putGroupInfo(groupId, groupName, description, cb) {
        ciborgDb.putGroupInfo(groupId, groupName, description, cb);
    }

    function putGameIntoGroup(groupId, gameId, cb) {
        

        ciborgDb.putGameIntoGroup(()=>{boardGamesData.getGameById(gameId)},groupId, cb);
    }


    function deleteGameFromGroup(groupId, gameId, cb) {
        ciborgDb.deleteGameFromGroup(groupId, gameId, cb);
    }
}