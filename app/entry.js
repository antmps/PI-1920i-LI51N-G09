'use strict'

require('../node_modules/bootstrap/dist/css/bootstrap.min.css')
require('./assets/css/styles.css')
require('bootstrap')

const templates = require('./templates')
const bookshelfImg = require('./img/home_image_BW.jpg')
const gamesData = require('./data/games-data')
const groupsData = require('./data/groups-data')
const gamesScript = require('./handlers/games')

const mainContent = document.getElementById('mainContent')
const alertContent = document.getElementById('alertContent')
const loginHandler = require('./handlers/login')
const logoutHandler = require('./handlers/logout')

window.addEventListener('hashchange', handler)
function isLogedIn() {
    fetch('http://localhost:8080/api/auth/session')
        .then(res => res.json())
        .then((user) => {
            if (user.auth) {
                document.getElementById("login").style.visibility = "hidden"
                document.getElementById("logout").style.visibility = "visible"
                document.getElementById("groups").style.visibility = "visible"
                document.getElementById("username").innerText = user.username
                document.getElementById("username").style.visibility = "visible"
                window.location.hash = '#home'

            }
        })
}
isLogedIn()
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
                gamesScript.registerSearch()
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
                        gamesScript.registerAddToGroup(id)
                    })
                break;
            case 'groupDetails':
                var id = args[0]
                groupsData.getGroupById(id)
                    .then(groups => {
                        mainContent.innerHTML = templates.groupDetails({ groups })
                    })
                    .catch((err) => document.getElementById("alertContent").innerHTML = templates.info({ message: err.message }))
                break;
            case 'Mygroups':
                groupsData.getGroupsByUsername()
                    .then(groups => {
                        mainContent.innerHTML = templates.groups({ groups })
                    })
                    .catch((err) => document.getElementById("alertContent").innerHTML = templates.info({ message: err.message }))
                break;
            case 'addToGroup':
                var groupId = args[0]
                var gameId = args[1]
                groupsData.putGameinGroup(groupId, gameId)
                    .then(res => res.json())
                    .then(res => {
                        if (res.body == groupId) {//sucessfull
                            document.getElementById("alertContent").innerHTML = templates.info("Successfully added game.")
                            window.location.hash = `groupDetails/${groupId}`
                        } else {
                            document.getElementById("alertContent").innerHTML = templates.info("Could not add game.")
                        }
                    })
                    .catch((err) => {
                        document.getElementById("alertContent").innerHTML = templates.info("ot logged in.")
                        window.location.hash = `gameDetails/${gameId}`
                    })

                break;
            default:
                window.location.hash = "home"
        }
    } catch (err) {
        alertContent.innerHTML = templates.error(err.message)
    }

}
