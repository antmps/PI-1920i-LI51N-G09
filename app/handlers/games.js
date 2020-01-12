'use strict'

const gamesData = require('../data/games-data')
const template = require('../templates')

function registerSearch() {
    const buttonSearch = document.getElementById("buttonSearch")
    buttonSearch.addEventListener('click', handleSearch)
    console.log("REGISTERED")
    function handleSearch(e){
        console.log("HANDLE")
        e.preventDefault()
        const gamesContainer = document.getElementById("searchContent")
        const gameName = document.getElementById("txt_Search_Games").value
        gamesData.getGameByName(gameName)
            .then(games => gamesContainer.innerHTML = template.tableGamesTemplate({games})
        )
    }
}

function registerAddToGroup( groupId, gameId){
    const buttonAdd = document.getElementById("buttonAddToGroup")
    buttonAdd.addEventListener('click',handleAdd)

    function handleAdd(e){
        e.preventDefault()
        gamesData.putGameIntoGroup(groupId,gameId)
    }
}

module.exports = {
    
    registerSearch : registerSearch,
    registerAddToGroup : registerAddToGroup

    
}