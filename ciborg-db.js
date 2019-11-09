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
        deleteGameFromGroup: deleteGameFromGroup,
        getGamesFromGroup: getGamesFromGroup
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
            body: bodyReceived
        }
        request.post(options, (err, res, body) => {
            cb(err, { id: body._id });
        });
    }

    function putGroupInfo(groupId, arrayBody, bodyReceived, cb) {
        const options = {
            url: `${baseUrl}/groups/_doc/${groupId}`,
            json: true,
            body: {
                'name': bodyReceived.name,
                'description':bodyReceived.description,
                'games': arrayBody
            }
        };
        request.put(options, (err, res, body) => {
            cb(err, { id: body._id });
        });
    }

    function putGameIntoGroup(body, groupId, cb) {
        const options = {
            url: `${baseUrl}/groups/_doc/${groupId}/_source/`,
            json: true,
            body: body
        }
        request.post(options, (err, res, body) => {
            cb(err, { id: body._id });
        });
    }

    function deleteGameFromGroup(groupId, gameId, cb) {
        const options = {
            url: `${baseUrl}/groups/_doc/${groupId}/games/_game/${gameId}`,
            headers: { 'Content-type': 'application/json' },
            json: true
        }
        request.delete(options, (err, res, body) => {
            cb(err, { id: body._id });
        });
    }

    function getGamesFromGroup(groupId,cb){
        const options = {
            url: `${baseUrl}/groups/_doc/${groupId}/_source`,
            json:true
        };
        request.get(options, (err,res,body)=> {
            cb(err, body.games);
        });
    }
}