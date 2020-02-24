'use strict'

require('../node_modules/bootstrap/dist/css/bootstrap.min.css')
require('./assets/css/styles.css')
require('bootstrap')

const templates = require('./templates')
const bookshelfImg = require('./img/home_image_BW.jpg')

const mainContent = document.getElementById('mainContent')
const alertContent = document.getElementById('alertContent')
const loginHandler = require('./handlers/login')
const logoutHandler = require('./handlers/logout')
const gamesHandler = require('./handlers/games')
const groupsHandler = require('./handlers/groups')

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

    mainContent.innerHTML = templates.loading()

    const hash = window.location.hash.substring(1)
    const [state, ...args] = hash.split('/')

    try {
        switch (state) {
            case 'home':
                mainContent.innerHTML = templates.home({ bookshelfImg })
                break;
            case 'search':
                mainContent.innerHTML = templates.games()
                gamesHandler.registerSearch()
                break;
            case 'top':
                gamesHandler.topGames()
                break;
            case 'login':
                loginHandler()
                break;
            case 'logout':
                logoutHandler()
                break;
            case 'gameDetails':
                var id = args[0]
                gamesHandler.gameDetails(id)
                break;
            case 'groupDetails':
                var id = args[0]
                groupsHandler.groupDetails(id)
                break;
            case 'removeGameFromGroup':
                var groupId = args[0]
                var gameId = args[1]
                groupsHandler.removeGameFromGroup(groupId, gameId)
                break;
            case 'myGroups':
                groupsHandler.myGroups()
                break;
            case 'createGroup':
                mainContent.innerHTML = templates.createGroup()
                groupsHandler.createGroup()
                break;
            case 'addToGroup':
                var groupId = args[0]
                var gameId = args[1]
                groupsHandler.addToGroup(groupId, gameId)
                break;
            default:
                window.location.hash = "home"
        }
    } catch (err) {
        alertContent.innerHTML = templates.error({message : err.message})
        window.location.hash = "home"
    }

}
