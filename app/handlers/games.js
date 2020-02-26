'use strict'

const gamesData = require('../data/games-data')
const groupsData = require('../data/groups-data')
const templates = require('../templates')
const mainContent = document.getElementById('mainContent')
const alertContent = document.getElementById('alertContent')

function registerSearch() {
    const buttonSearch = document.getElementById("buttonSearch")
    buttonSearch.addEventListener('click', handleSearch)
    console.log("REGISTERED")
    function handleSearch(e) {
        console.log("HANDLE")
        e.preventDefault()
        const gamesContainer = document.getElementById("searchContent")
        const gameName = document.getElementById("txt_Search_Games").value
        gamesData.getGameByName(gameName)
            .then(games => gamesContainer.innerHTML = templates.tableGamesTemplate({ games })
            )
    }
}

function registerAddToGroup(gameId) {
    const buttonAdd = document.getElementById('buttonAddToGroup')
    buttonAdd.addEventListener('click', handleAdd)
    console.log('button add')

    function handleAdd(e) {
        e.preventDefault()
        groupsData.getGroupsByUsername()
            .then(groups => {
                groups.forEach(element => {
                    element.gameId = gameId
                });
                mainContent.innerHTML = templates.groupsSelect({ groups })
            }).catch(err => {
                alertContent.innerHTML = templates.error({ message: 'Must be logged in' })
                window.location.hash = "login"
            })
    }
}

function gameDetails(gameId) {
    gamesData.getGameById(gameId)
        .then(games => {
            var game = games.games[0]
            game.isAuthenticated = games.isAuthenticated
            mainContent.innerHTML = templates.gameDetails({ game })
            registerAddToGroup(gameId)
        })
}

function topGames() {
    gamesData.getTopGames()
        .then(games => mainContent.innerHTML = templates.tableGamesTemplate({ games }))
}

module.exports = {

    registerSearch: registerSearch,
    registerAddToGroup: registerAddToGroup,
    gameDetails: gameDetails,
    topGames: topGames

}