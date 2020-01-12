'use strict'

const gamesData = require('../data/games-data')
const template = require('../templates')


module.exports = function(){
    
    registerSearch()

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
}