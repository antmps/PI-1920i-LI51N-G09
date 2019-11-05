'use strict'

const request = require('request');
//access to BD ElasticSearch

const host = 'localhost:9200/';
const baseUrl = `http://${host}`;

function getGroups(cb){
    const options = {
        url: `${baseUrl}groups/_search`,
        json: true
    };
    request.get
    
}

function getGroupsById(groupId, cb){

}

function getGroupGameByDuration(groupId, min, max, cb){

}

function postGroup(groupName, description, cb){

}

function putGroupInfo(groupId, groupName, description, cb){

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