'use strict'

function GroupsApiUris() {
    const baseUri = "http://localhost:8080/api/"

    this.getGroupByIdUri = (id) => `${baseUri}groups/${id}`
    this.getGroupsByUsernameUri = (username) => `${baseUri}${username}/groups`
}

const Uris = new GamesApiUris()

function getGroupById(id) {
    return fetch(Uris.getGroupByIdUri(id))
        .then(res => res.json())
}

function getGroupsByUsername(username) {
    return fetch(Uris.getGroupsByUsernameUri(username))
        .then(res => res.json())
}

module.exports = {
    getGroupById: getGroupById, 
    getGroupsByUsername: getGroupsByUsername
}