'use strict'

function GamesApiUris() {
    const baseUri = "http://localhost:8080/api/"

    this.getTopGamesUri = () => `${baseUri}games/top`
    this.getGameByNameUri = (name) => `${baseUri}games/${name}`
    this.getGameByIdUri = (id) => `${baseUri}games/id/${id}`
    this.getGroupsUri = () => `${baseUri}groups`
    this.getGroupsByIdUri = (groupId) => `${baseUri}groups/${groupId}`
    this.getGroupGameByDurationUri = (groupId) => `${baseUri}groups/${groupId}/games`
    
    this.postGroupUri = () => `${baseUri}groups`

    this.putGroupInfoUri = (groupId)=> `${baseUri}groups/${groupId}`
    this.putGameIntoGroupUri = (groupId)=> `${baseUri}groups/${groupId}/games/`

    this.deleteGameFromGroup = (groupId,gameId)=> `${baseUri}groups/${groupId}/games/${gameId}`
}

const Uris = new GamesApiUris()

function getTopGames(){
    return fetch(Uris.getTopGamesUri())
            .then(res => res.json())
}

function getGameByName(name){
    return fetch(Uris.getGameByNameUri(name))
            .then(res => res.json())
}

function getGameById(id){
    return fetch(Uris.getGameByIdUri(id))
            .then(res => res.json())
}

function getGroups(){
    return fetch(Uris.getGroupsUri())
            .then(res => res.json())
}

function getGroupsById(groupId){
    return fetch(Uris.getGroupsByIdUri(groupId))
            .then(res => res.json())
}

function getGroupGameByDuration(groupId){
    return fetch(Uris.getGroupGameByDurationUri(groupId))
            .then(res => res.json())
}

function putGameIntoGroup(groupId, gameId){
    const options = {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body : JSON.stringify({
            gameId : gameId
        })
    }
    return fetch(Uris.putGameIntoGroupUri(groupId), options)
            .then(res => res.json())
}

module.exports = {
    getTopGames:getTopGames,
    getGameByName:getGameByName,
    getGameById:getGameById,
    getGroups:getGroups,
    getGroupsById:getGroupsById,
    getGroupGameByDuration,getGroupGameByDuration,
    putGameIntoGroup : putGameIntoGroup
}