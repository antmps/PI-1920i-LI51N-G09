'use strict'

require('../node_modules/bootstrap/dist/css/bootstrap.min.css')
require('./assets/css/styles.css')
require('bootstrap')

const templates = require('./templates')
const bookshelfImg = require('./img/home_image_BW.jpg')
const gamesData = require('./data/games-data')
const gamesScript = require('./handlers/games')

const mainContent = document.getElementById('mainContent')
const alertContent = document.getElementById('alertContent')
const loginHandler = require('./handlers/login')
const logoutHandler = require('./handlers/logout')

window.addEventListener('hashchange', handler)
handler()

function handler() {

    const hash = window.location.hash.substring(1)
    const [state, ...args] = hash.split('/')

    try {
        switch (state) {
            case 'home':
                mainContent.innerHTML = templates.home({ bookshelfImg })
                break;
            case 'search':
                mainContent.innerHTML = templates.games()
                gamesScript()
                break;
            case 'top':
                gamesData.getTopGames()
                    .then(games => mainContent.innerHTML = templates.tableGamesTemplate({ games }))
                break;
            case 'login':
                loginHandler()
                break;
            case 'logout':
                logoutHandler()
                break;
            case 'gameDetails':
                var id = args[0]
                gamesData.getGameById(id)
                    .then(games => {
                        var game = games.body.games[0]
                        game.isAuthenticated = games.isAuthenticated
                        mainContent.innerHTML = templates.gameDetails({ game })
                    })
                break;
            case 'groups':
                break;
            default:
                window.location.hash = "home"
        }
    } catch (err) {
        alertContent.innerHTML = templates.error(err.message)
    }

}
