'use strict'

const logger = new (require('../logger'))()
const cluster = require('cluster')

let CPUCount = require('os').cpus().length
// CPUCount = 1

cluster.on('disconnect', (worker, code, signal) => {
    // В случае отключения IPC запустить нового рабочего (мы узнаем про это подробнее далее)
  logger.log(`Worker ${worker.id} died`)
    // запишем в лог отключение сервера, что бы разработчики обратили внимание.
  cluster.fork()
    // Создадим рабочего
})

cluster.on('online', (worker) => {
    // Если рабочий соединился с нами запишем это в лог!
  logger.log(`Worker ${worker.id} running`)
})
// Создадим рабочих в количестве CPUCount
for (var i = 0; i < CPUCount; ++i) {
  cluster.fork()
}
