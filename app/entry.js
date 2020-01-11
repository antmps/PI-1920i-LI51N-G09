'use strict'

require('../node_modules/bootstrap/dist/css/bootstrap.min.css')
require('./assets/css/styles.css')
require ('bootstrap')

const templates = require('./templates')
const bookshelfImg = require('./img/home_image_BW.jpg')

window.addEventListener('hashchange', handler)
handler()

function handler(){

    const hash = window.location.hash.substring(1)
    const [state, ...args] = hash.split('/')
    const mainContent = document.getElementById('mainContent')
    const alertContent = document.getElementById('alertContent')
    
    switch(state){
        case 'home' :
            mainContent.innerHTML = templates.home({bookshelfImg})
            break;
        case 'games' :
            mainContent.innerHTML = templates.games()
            break;
        case 'gamesearch' :
            var gameName = document.getElementById('txt_Search_Games')
            //service.getGameByName(gameName)
            break;
        default:
            window.location.hash="home"
    }
}
