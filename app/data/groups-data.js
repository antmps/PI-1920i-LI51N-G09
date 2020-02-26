'use strict'

function GroupsApiUris() {
    const baseUri = "http://localhost:8080/api/"

    this.getGroups = () => `${baseUri}groups`
    this.getGroupByIdUri = (id) => `${baseUri}groups/${id}`
    this.getGroupsByUsernameUri = () => `${baseUri}groupsByUsername`
    this.getGamesFromGroupByPlaytimeUri = (groupId,min,max) => `${baseUri}groups/${groupId}/games?min=${min}&max=${max}`
    this.postGroupUri = () =>`${baseUri}groups` 
    this.putGameinGroupUri = (groupId) => `${baseUri}groups/${groupId}/games`
    this.deleteGameFromGroupUri = (groupId,gameId)=> `${baseUri}groups/${groupId}/games/${gameId}`
    this.updateGroupUri = (groupId) => `${baseUri}groups/${groupId}`
}

const Uris = new GroupsApiUris()

function getGroups() {
    return fetch(Uris.getGroups())
        .then(res => res.json())
}

function getGroupById(id) {
    return fetch(Uris.getGroupByIdUri(id))
        .then(res => res.json())
}

function getGroupsByUsername() {
    return fetch(Uris.getGroupsByUsernameUri())
        .then(res => res.json())
}

function getGamesFromGroupByPlaytime(groupId,min,max){
    return fetch(Uris.getGamesFromGroupByPlaytimeUri(groupId,min,max))
        .then(res => res.json())
}

function postGroup(name,desc){
    const options = {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
            'name': name,
            'description': desc
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch('http://localhost:8080/api/groups', options)
    .then(res => res.json())
}

function putGameinGroup(groupId, gameId) {
    const options = {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify({
            'gameId': gameId
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return fetch(Uris.putGameinGroupUri(groupId), options)
    .then(res => res.json())
}

function deleteGameFromGroup(groupId, gameId){
    const options = {
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify({
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return fetch(Uris.deleteGameFromGroupUri(groupId,gameId), options)
    .then(res => res.json())
}

function updateGroup(groupId, name, desc){
    const options = {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify({
            'name':name,
            'description':desc
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return fetch(Uris.updateGroupUri(groupId), options)
    .then(res => res.json())
}

module.exports = {
    getGroups: getGroups,
    getGroupById: getGroupById,
    getGroupsByUsername: getGroupsByUsername,
    getGamesFromGroupByPlaytime:getGamesFromGroupByPlaytime,
    postGroup:postGroup,
    putGameinGroup: putGameinGroup,
    deleteGameFromGroup:deleteGameFromGroup,
    updateGroup:updateGroup
}