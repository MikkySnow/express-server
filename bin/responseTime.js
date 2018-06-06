'use strict'

const logger = new (require('../logger'))()

module.exports = function (req, res, next) {
  const beginTime = Date.now()
  res.on('finish', () => {
    const d = Date.now()
    logger.log('Reponse time: ' + (d - beginTime), {
      url: req.url, // записать в лог куда пришел запрос (Включает urlencode string)
      time: (d - beginTime) // сколько прошло времени
    })
  })
  // Передать действие другому обработчику
  next()
}
