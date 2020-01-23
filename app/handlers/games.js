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
                groups.body.forEach(element => {
                    element.gameId = gameId
                });
                mainContent.innerHTML = templates.groupsSelect({ groups })
            }).catch(err => {
                alertContent.innerHTML = templates.info({ message: 'Must be logged in' })
                window.location.hash = "login"
            })
    }
}

module.exports = {

    registerSearch: registerSearch,
    registerAddToGroup: registerAddToGroup

}