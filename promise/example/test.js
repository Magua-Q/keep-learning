const Promise = require('../promise')

const promise = new Promise((resolve, reject) => {
    // throw new Error('失败')
    resolve(1)
    // reject(0)
    // setTimeout(() => {
    //     // resolve('芭比q了')
    //     reject('完蛋了')
    // }, 1000)
})

promise.then((data) => {
    console.log('success', data)
    return 2
}, (err) => {
    console.log('defeat', err)
}).then((data) => {
    console.log('----',data)
})