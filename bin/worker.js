'use strict'

const logger = new (require('../logger'))()
const config = require('../config')
const path = require('path')

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cons = require('consolidate')

// Время ответа
app.use(require('./responseTime'))

app.use('/public', express.static(path.join(__dirname, '../public')))

// JSON Parser
app.use(bodyParser.json({
  limit: '10kb'
}))

// Используем движок усов
app.engine('html', cons.mustache)
// установить движок рендеринга
app.set('view engine', 'html')

app.set('views', path.join(__dirname, '/../views'))

app.use(require('./../controllers'))

// Обработчик ошибок
app.use(require('./errorHandler'))

// Все Worker-ы  должны иметь один и тот же порт
app.listen(config.port, function (err) {
  if (err) throw err
  logger.log(`Running server at port ${config.port}!`)
})
