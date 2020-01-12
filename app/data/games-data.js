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
    return fetch(Uris.getTopGamesUri(),{credentials: 'include'})
            .then(res => res.json())
}

function getGameByName(name){
    return fetch(Uris.getGameByNameUri(name),{credentials: 'include'})
            .then(res => res.json())
}

function getGameById(id){
    return fetch(Uris.getGameByIdUri(id),{credentials: 'include'})
            .then(res => res.json())
}

function getGroups(){
    return fetch(Uris.getGroupsUri()),{credentials: 'include'}
            .then(res => res.json())
}

function getGroupsById(groupId){
    return fetch(Uris.getGroupsByIdUri(groupId),{credentials: 'include'})
            .then(res => res.json())
}

function getGroupGameByDuration(groupId){
    return fetch(Uris.getGroupGameByDurationUri(groupId),{credentials: 'include'})
            .then(res => res.json())
}

module.exports = {
    getTopGames:getTopGames,
    getGameByName:getGameByName,
    getGameById:getGameById,
    getGroups:getGroups,
    getGroupsById:getGroupsById,
    getGroupGameByDuration,getGroupGameByDuration
}