'use strict'

function GroupsApiUris() {
    const baseUri = "http://localhost:8080/api/"

    this.getGroups = () => `${baseUri}groups`
    this.getGroupByIdUri = (id) => `${baseUri}groups/${id}`
    this.getGroupsByUsernameUri = () => `${baseUri}groupsByUsername`
    this.putGameinGroupUri = (groupId) => `${baseUri}groups/${groupId}/games`
    this.deleteGameFromGroupUri = (groupId,gameId)=> `${baseUri}groups/${groupId}/games/${gameId}`
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
}

module.exports = {
    getGroups: getGroups,
    getGroupById: getGroupById,
    getGroupsByUsername: getGroupsByUsername,
    putGameinGroup: putGameinGroup,
    deleteGameFromGroup:deleteGameFromGroup
}