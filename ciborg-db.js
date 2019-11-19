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

        /*
        return request(options)
            .then(body => body.hits.hits.map(e => e._source))
            .catch(err => throw err)
        */

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

        getGamesFromGroup(groupId,(err,games)=>{
            var array = []
            for(var i = 0; i< games.length;i++){
                if(min <= games[i].min_playtime && max >= games[i].max_playtime)
                array.push(games[i])
            }

            cb(err,array)

        })
    }

    function postGroup(bodyReceived, cb) {
        const options = {
            url: `${baseUrl}/groups/_doc`,
            headers: { 'Content-Type': 'application/json' },
            json: true,
            body: {
                'name': bodyReceived.name,
                'description': bodyReceived.description,
                'games': []
            }
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
                'description': bodyReceived.description,
                'games': arrayBody
            }
        };
        request.put(options, (err, res, body) => {
            cb(err, { id: body._id });
        });
    }

    function putGameIntoGroup(groupBody, groupId, cb) {
        const options = {
            url: `${baseUrl}/groups/_doc/${groupId}`,
            json: true,
            body: {
                'name': groupBody.name,
                'description': groupBody.description,
                'games': groupBody.games
            }
        }
        request.put(options, (err, res, body) => {
            cb(err, { id: body._id});
        });
    }

    function deleteGameFromGroup(groupId, groupBody, cb) {
        const options = {
            url: `${baseUrl}/groups/_doc/${groupId}`,
            headers: { 'Content-type': 'application/json' },
            json: true,
            body: {
                'name': groupBody.name,
                'description': groupBody.description,
                'games': groupBody.games
            }
        }
        request.post(options, (err, res, body) => {
            cb(err, { id: body._id });
        });
    }

    function getGamesFromGroup(groupId, cb) {
        const options = {
            url: `${baseUrl}/groups/_doc/${groupId}/_source`,
            json: true
        };
        request.get(options, (err, res, body) => {
            cb(err, body.games);
        });
    }
}