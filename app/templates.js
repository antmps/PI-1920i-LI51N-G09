'use strict'

const Handlebars = require('../node_modules/handlebars/dist/handlebars')

const tableGamesTemplate = require('./templates/gameTable.hbs').default
Handlebars.registerPartial('tableGamesTemplate',tableGamesTemplate)

module.exports = {
    home: Handlebars.compile(require('./templates/home.hbs').default),
    games: Handlebars.compile(require('./templates/games.hbs').default),
    error: Handlebars.compile(require('./templates/error.hbs').default),
    tableGamesTemplate : Handlebars.compile(tableGamesTemplate),
    gameDetails : Handlebars.compile(require('./templates/gameDetails.hbs').default)
} 