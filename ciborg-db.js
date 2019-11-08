'use strict'

const request = require('request');
//access to BD ElasticSearch

module.exports = function (host) {

    const baseUrl = `http://${host}`;

    return {
        getGroups: getGroups,
        getGroupsById: getGroupsById,
        getGroupGameByDuration: getGroupGameByDuration,
        postGroup: postGroup,
        putGroupInfo: putGroupInfo,
        putGameIntoGroup: putGameIntoGroup,
        deleteGameFromGroup: deleteGameFromGroup
    };

    function getGroups(cb) {
        const options = {
            url: `${baseUrl}/groups/_search`,
            json: true
        };
        request.get(options, (err, res, body) => {
            cb(err, body.hits.hits.map(e => e._source));
        })

    }

    function getGroupsById(groupId, cb) {
        const options = {
            url: `${baseUrl}/groups/_doc/${groupId}`,
            json: true
        };
        request.get(options, (err, res, body) => {
            cb(err, body._source);
        });
    }

    function getGroupGameByDuration(groupId, min, max, cb) {

    }

    function postGroup(bodyReceived, cb) {
        const options = {
            url: `${baseUrl}/groups/_doc`,
            headers: { 'Content-Type': 'application/json' },
            json: true,
            body:bodyReceived
        }
        request.post(options, (err, res, body) => {
            cb(err, { id: body._id });
        });
    }

    function putGroupInfo(groupId, bodyReceived, cb) {
        const options = {
            url: `${baseUrl}/groups/_doc/${groupId}`,
            headers: {'Content type' : 'application/json'},
            json: true,
            body:{
                'name' : bodyReceived.name,
                'description': bodyReceived.description
            }
        };
        request.post(options, (err,res,body)=>{
            cb(err,{id:body._id});
        });

    }

    function putGameIntoGroup(body,groupId, cb) {
        const options = {
            url : `${baseUrl}/groups/${groupId}/games/_doc`,
            headers : {'Content-Type': 'application/json'},
            json : true,
            body : body
        }
        request.post(options, (err, res, body) => {
            cb(err, { id: body._id });
        });
    }

    function deleteGameFromGroup(groupId, gameId, cb) {

    }


}