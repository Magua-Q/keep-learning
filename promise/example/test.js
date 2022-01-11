const Promise = require('../promise')

const promise = new Promise((resolve, reject) => {
    // throw new Error('失败')
    // resolve(1)
    reject(0)
})

promise.then((data) => {
    console.log('success', data)
}, (err) => {
    console.log('defeat', err)
})