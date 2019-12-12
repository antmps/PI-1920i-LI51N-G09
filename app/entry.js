'use strict'

require('../node_modules/bootstrap/dist/css/bootstrap.min.css')
require ('bootstrap')

const templates = require('./templates')
const bookshelfImg = require('./img/home_image.jpg')

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
            break;
        default:
            window.location.hash="home"
    }
}