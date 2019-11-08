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
            url: `${baseUrl}/groups/${groupId}`,
            json: true
        };
        request.get(options, (err, res, body) => {
            cb(err, body.hits.hits.map(e => e._source));
        });
    }

    function getGroupGameByDuration(groupId, min, max, cb) {

    }

    function postGroup(body, cb) {
        const options = {
            url: `${baseUrl}/groups/_doc`,
            headers: { 'Content-Type': 'application/json' },
            json: true,
            body:body
        }
        request.post(options, (err, res, body) => {
            cb(err, { id: body._id });
        });
    }

    function putGroupInfo(groupId, body, cb) {

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