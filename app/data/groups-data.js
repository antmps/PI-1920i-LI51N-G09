'use strict'

function GroupsApiUris() {
    const baseUri = "http://localhost:8080/api/"

    this.getGroups = () => `${baseUri}groups`
    this.getGroupByIdUri = (id) => `${baseUri}groups/${id}`
    this.getGroupsByUsernameUri = (username) => `${baseUri}${username}/groups`
}

const Uris = new GroupsApiUris()

function getGroups(){
    return fetch(Uris.getGroups())
        .then(res => res.json())
}

function getGroupById(id) {
    return fetch(Uris.getGroupByIdUri(id))
        .then(res => res.json())
}

function getGroupsByUsername(username) {
    console.log("GROUPBYUSER:" + username.username)
    return fetch(Uris.getGroupsByUsernameUri(username.username))
        .then(res => res.json())
}

module.exports = {
    getGroups : getGroups,
    getGroupById: getGroupById, 
    getGroupsByUsername: getGroupsByUsername
}