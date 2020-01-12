'use strict'

const request = require('request');
const promise = require('./request-promise')()
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
        getGamesFromGroup: getGamesFromGroup,
        postUser: postUser,
        getAllUsers: getAllUsers
    };

    function getGroups() {
        const options = {
            url: `${baseUrl}/groups/_search`,
            method: 'GET',
            json: true
        };

        return promise.request(options)
            .then(body => body.hits.hits.map(e => {
                var group = e._source
                group.id = e._id
                return group
            }))
            .catch(err => { throw err })
    }

    function getGroupsById(groupId, cb) {
        const options = {
            url: `${baseUrl}/groups/_doc/${groupId}`,
            method: 'GET',
            json: true
        };

        return promise.request(options)
            .then(body => body._source)
            .catch(err => { throw err })
    }

    function getGroupGameByDuration(groupId, min, max, cb) {

        return getGamesFromGroup(groupId)
            .then((games) => {
                var array = []
                for (var i = 0; i < games.length; i++) {
                    if (min <= games[i].min_playtime && max >= games[i].max_playtime)
                        array.push(games[i])
                }
                return array
            })
            .catch(err => { throw err })
    }

    function postGroup(bodyReceived, cb) {
        const options = {
            url: `${baseUrl}/groups/_doc`,
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            json: true,
            body: {
                'username': bodyReceived.username,
                'name': bodyReceived.name,
                'description': bodyReceived.description,
                'games': []
            }
        }

        return promise.request(options)
            .then(body => body._id)
            .catch(err => { throw err })
    }

    function putGroupInfo(groupId, arrayBody, bodyReceived, cb) {
        const options = {
            url: `${baseUrl}/groups/_doc/${groupId}`,
            method: 'PUT',
            json: true,
            body: {
                'username': bodyReceived.username,
                'name': bodyReceived.name,
                'description': bodyReceived.description,
                'games': arrayBody
            }
        };


        return promise.request(options)
            .then(body => body._id)
            .catch(err => { throw err })
    }

    function putGameIntoGroup(groupBody, groupId, cb) {
        const options = {
            url: `${baseUrl}/groups/_doc/${groupId}`,
            method: 'PUT',
            json: true,
            body: {
                'username': groupBody.username,
                'name': groupBody.name,
                'description': groupBody.description,
                'games': groupBody.games
            }
        }
        return promise.request(options)
            .then(body => body._id)
            .catch(err => { throw err })
    }

    function deleteGameFromGroup(groupId, groupBody, cb) {
        const options = {
            url: `${baseUrl}/groups/_doc/${groupId}`,
            headers: { 'Content-type': 'application/json' },
            method: 'POST',
            json: true,
            body: {
                'name': groupBody.name,
                'description': groupBody.description,
                'games': groupBody.games
            }
        }
        return promise.request(options)
            .then(body => body._id)
            .catch(err => { throw err })
    }

    function getGamesFromGroup(groupId, cb) {
        const options = {
            url: `${baseUrl}/groups/_doc/${groupId}/_source`,
            method: 'GET',
            json: true
        };
        return promise.request(options)
            .then(body => body.games)
            .catch(err => { throw err })
    }

    function postUser(user, cb) {
        const options = {
            url: `${baseUrl}/users/_doc`,
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            json: true,
            body: {
                'fullName': user.fullName,
                'username': user.username,
                'password': user.password
            }
        }

        return promise.request(options)
            .then(body => {
                user.id = body._id
                return user
            })
            .catch(err => { throw err })
    }

    function getAllUsers(cb) {
        const options = {
            url: `${baseUrl}/users/_search`,
            method: 'GET',
            json: true
        };

        return promise.request(options)
            .then(body => body.hits.hits.map(e => e._source))
            .catch(err => { throw err })
    }

}