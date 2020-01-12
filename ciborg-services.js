'use strict'


module.exports = function (boardGamesData, ciborgDb) {

    return {
        getTopGames: getTopGames,
        getGameByName: getGameByName,
        getGameById: getGameById,
        getGroups: getGroups,
        getGroupById: getGroupById,
        getGroupByUsername: getGroupByUsername,
        getGroupGameByDuration: getGroupGameByDuration,

        postGroup: postGroup,

        putGroupInfo: putGroupInfo,
        putGameIntoGroup: putGameIntoGroup,

        deleteGameFromGroup: deleteGameFromGroup
    };

    function getTopGames() {
        return boardGamesData.getTopGames();
    }

    function getGameByName(name) {
        return boardGamesData.getGameByName(name);
    }

    function getGameById(id) {
        return boardGamesData.getGameById(id);
    }

    function getGroups() {
        return ciborgDb.getGroups();
    }

    function getGroupById(groupId) {
        return ciborgDb.getGroupsById(groupId);
    }

    function getGroupByUsername(username) {
        return ciborgDb.getGroups()
            .then(groups => {
                return groups.filter(group => group.username == username)
            })
            .catch(err => { throw err })
    }

    function getGroupGameByDuration(groupId, min, max) {
        return ciborgDb.getGroupGameByDuration(groupId, min, max);
    }


    function postGroup(body) {
        return ciborgDb.postGroup(body);
    }

    function putGroupInfo(groupId, body) {

        return ciborgDb.getGamesFromGroup(groupId)
            .then((arrayBody) => {
                return ciborgDb.putGroupInfo(groupId, arrayBody, body)
            })
            .catch(err => { throw err })
    }

    function putGameIntoGroup(groupId, gameId) {

        return boardGamesData.getGameById(gameId)
            .then((gameBody) => {
                return ciborgDb.getGroupsById(groupId)
                    .then((groupBody) => {
                        groupBody.games.push(boardGamesData.getGameBasicInfo(gameBody.games[0]))
                        return ciborgDb.putGameIntoGroup(groupBody, groupId);
                    })
            })
            .catch(err => { throw err })
    }

    function deleteGameFromGroup(groupId, gameId) {

        //get current _sorce from group
        return ciborgDb.getGroupsById(groupId)
            .then((groupBody) => {
                var size = groupBody.games.length
                var array = []

                for (var i = 0; i < size; i++) {
                    if (groupBody.games[i].id != gameId)
                        array.push(groupBody.games[i])
                }

                groupBody.games = array

                if (size != array.length) return ciborgDb.deleteGameFromGroup(groupId, groupBody);
                else throw new Error("Game doesn´t exist")
            })
            .catch(err => { throw err })
    }
}