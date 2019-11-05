'use strict'

//access to BD ElasticSearch


function getGroups(cb){

}

function getGroupsById(groupId, cb){

}

function getGroupGameByDuration(groupId, min, max, cb){

}

function postGroup(groupName, description, cb){

}

function putGroupInfo(groupId, description, cb){

}

function putGameIntoGroup(groupId, gameId, cb){

}

function deleteGameFromGroup(groupId, gameId, cb){

}


module.exports.getGroups = getGroups;
module.exports.getGroupsById = getGroupsById;
module.exports.getGroupGameByDuration = getGroupGameByDuration;
module.exports.postGroup = postGroup;
module.exports.putGroupInfo = putGroupInfo;
module.exports.putGameIntoGroup = putGameIntoGroup;
module.exports.deleteGameFromGroup = deleteGameFromGroup;