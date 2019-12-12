'use strict'

const Handlebars = require('../node_modules/handlebars/dist/handlebars')

module.exports = {
    home: Handlebars.compile(require('./templates/home.hbs').default),
    error: Handlebars.compile(require('./templates/error.hbs').default)
} 