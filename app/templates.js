'use strict'

const Handlebars = require('../node_modules/handlebars/dist/handlebars')

const gameDetailsTemplate = require('./templates/gameSearchInfo.hbs').default
Handlebars.registerPartial('gameDetailsTemplate',gameDetailsTemplate)

module.exports = {
    home: Handlebars.compile(require('./templates/home.hbs').default),
    games: Handlebars.compile(require('./templates/games.hbs').default),
    gamesearch : Handlebars.compile(require('./templates/gameTable.hbs').default),
    gameDetailsTemplate : Handlebars.compile(gameDetailsTemplate),
    error: Handlebars.compile(require('./templates/error.hbs').default)
} 