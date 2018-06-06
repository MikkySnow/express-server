'use strict'

let app = (require('express').Router)()

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/login', (req, res) => {
    res.write('<p>Successfull login</p>')
    res.end()
})
module.exports = app
