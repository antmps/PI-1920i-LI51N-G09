'use strict'

const request = require('request');
//access to BD ElasticSearch

module.exports = function(host) {

    const baseUrl = `http://${host}`;

    return {
        getGroups : getGroups,
        ciborgDbgetGroupsById : getGroupsById,
        ciborgDbgetGroupGameByDuration : getGroupGameByDuration,
        ciborgDbpostGroup : postGroup,
        ciborgDbputGroupInfo : putGroupInfo,
        ciborgDbputGameIntoGroup : putGameIntoGroup,
        ciborgDbdeleteGameFromGroup : deleteGameFromGroup
    };

    function getGroups(cb) {
        const options = {
            url: `${baseUrl}groups/_search`,
            json: true
        };
        request.get(options, (err,res,body)=>{
            cb(err, body.hits.hits.map(e=>e._source));
        })

    }

    function getGroupsById(groupId, cb) {

    }

    function getGroupGameByDuration(groupId, min, max, cb) {

    }

    function postGroup(groupName, description, cb) {

    }

    function putGroupInfo(groupId, groupName, description, cb) {

    }

    function putGameIntoGroup(groupId, gameId, cb) {

    }

    function deleteGameFromGroup(groupId, gameId, cb) {

    }


}