// 发布订阅模式
/**
 * on： 把一些函数维护到一个数组中
 * emit：让数组中方法一次执行
 * 
*/
const fs = require('fs')
let obj = {}


let event = {
    arr: [],
    on: function(fn) {
        this.arr.push(fn)
    },
    emit: function (fn) {
        this.arr.forEach(fn => fn())
    }
}
event.on(function() {
    console.log('xxx')
})
fs.readFile('./output.txt', 'utf-8', function (err, data) {
    obj.content1 = data
    event.emit()
})

fs.readFile('./index.js', 'utf-8', function (err, data) {
    obj.content2 = data
    event.emit()
})