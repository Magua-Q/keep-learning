/**
 * 高阶函数是什么
 * 1. 函数的参数是一个函数(回调函数就是一种高阶函数)
 * 2. 函数的返回值是一个函数
 * 
 * 高阶函数的应用场景
 * 
 * 
*/

function say(params1, params2) {
    console.log('say', params1, params2)
}

Function.prototype.before = function (callback) {
    return (...args) => {
        callback()
        this(...args)
    }
}

const beforeSay = say.before(() => {
    console.log('before')
})

beforeSay(1, 2,3, 'hello')