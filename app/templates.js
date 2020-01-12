'use strict'

const Handlebars = require('../node_modules/handlebars/dist/handlebars')

const tableGamesTemplate = require('./templates/gameTable.hbs').default
Handlebars.registerPartial('tableGamesTemplate',tableGamesTemplate)

module.exports = {
    home: Handlebars.compile(require('./templates/home.hbs').default),
    games: Handlebars.compile(require('./templates/games.hbs').default),
    error: Handlebars.compile(require('./templates/error.hbs').default),
    info: Handlebars.compile(require('./templates/info.hbs').default),
    tableGamesTemplate : Handlebars.compile(tableGamesTemplate),
    login: Handlebars.compile(require('./templates/login.hbs').default),
    logout: Handlebars.compile(require('./templates/logout.hbs').default),
    gameDetails : Handlebars.compile(require('./templates/gameDetails.hbs').default),
    groups : Handlebars.compile(require('./templates/groups.hbs').default),
    groupDetails : Handlebars.compile(require('./templates/groupDetails.hbs').default)
} 