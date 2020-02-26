'use strict'

const Handlebars = require('../node_modules/handlebars/dist/handlebars')

const tableGamesTemplate = require('./templates/gameTable.hbs').default
const tableGamesGroupTemplate = require('./templates/gameTableGroups.hbs').default
Handlebars.registerPartial('tableGamesTemplate', tableGamesTemplate)
Handlebars.registerPartial('tableGamesGroupTemplate', tableGamesGroupTemplate)

module.exports = {
    home: Handlebars.compile(require('./templates/home.hbs').default),
    games: Handlebars.compile(require('./templates/games.hbs').default),
    error: Handlebars.compile(require('./templates/error.hbs').default),
    info: Handlebars.compile(require('./templates/info.hbs').default),
    login: Handlebars.compile(require('./templates/login.hbs').default),
    logout: Handlebars.compile(require('./templates/logout.hbs').default),
    gameDetails: Handlebars.compile(require('./templates/gameDetails.hbs').default),
    groups: Handlebars.compile(require('./templates/groups.hbs').default),
    groupsSelect: Handlebars.compile(require('./templates/groupsSelect.hbs').default),
    groupDetails: Handlebars.compile(require('./templates/groupDetails.hbs').default),
    tableGamesTemplate: Handlebars.compile(tableGamesTemplate),
    tableGamesGroupTemplate: Handlebars.compile(tableGamesGroupTemplate),
    loading:Handlebars.compile(require('./templates/loading.hbs').default),
    createGroup:Handlebars.compile(require('./templates/createGroup.hbs').default)
} 