'use strict'

const gamesData = require('./games-data')
const template = require('./templates')

module.exports = function(){

    listGamesByName()

    function listGamesByName(){        
        const gamesContainer = document.getElementById("gameContainer")
        gamesData.getGameByName("Catan")
            .then(games => gamesContainer.innerHTML = template.gameDetailsTemplate({games})
        )
    }
}