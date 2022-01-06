var events = require('events')

// 创建EventEmitter实例
var em = new events.EventEmitter()
var count = 0
setInterval(function () {
    em.emit('timed', count++)
}, 3000)

em.on('timed', function(data) {
    console.log('timed' + data)
})