'use strict'

let app = new (require('express').Router)()

app.use(require('./home'))

module.exports = app
