'use strict'

const data = require('./board-games-data')


function getTopGames(cb){
    data.getTopGames(cb);
}

function getGameByName(name, cb){
    data.getGameByName(name, cb);
}

function getGroups(cb){
    data.getGroups(cb);
}

function getGroupById(groupId, cb){
    data.getGroupsById(groupId,cb);
}

function getGroupGameByDuration(groupId, min, max, cb){
    data.getGroupGameByDuration(groupId,min,max,cb);
}


function postGroup(groupName, description, cb){
    data.postGroup(groupName,description,cb);
}


function putGroupInfo(groupId, description, cb){
    data.putGroupInfo(groupId,description,cb);
}

function putGameIntoGroup(groupId, gameId, cb){
    data.putGameIntoGroup(groupId,gameId,cb);
}


function deleteGameFromGroup(groupId, gameId, cb){
    data.deleteGameFromGroup(groupId,gameId,cb);
}


module.exports.getTopGames = getTopGames;
module.exports.getGameByName = getGameByName;
module.exports.getGroups = getGroups;
module.exports.getGroupById = getGroupById;
module.exports.getGroupGameByDuration = getGroupGameByDuration;

module.exports.postGroup = postGroup;

module.exports.putGroupInfo = putGroupInfo;
module.exports.putGameIntoGroup = putGameIntoGroup;

module.exports.deleteGameFromGroup = deleteGameFromGroup;