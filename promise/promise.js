/**
 * 1. promise 有三个状态：
 * 成功态
 * 失败态
 * 等待中
 * 
 * 2. promise 默认执行器会立即执行 executor()
 * 3. 成功的原因和失败的原因
 * 4. 实现异步调用
 * */
// 1. 三种状态
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
const PENDING = 'PENDING'

const resolvePromise = (promise2, x, resolve, reject) => {
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle '))
    }
    let called;
    if ((typeof x === 'object' && x != null) || typeof x === 'function') {
        try {
            let then = x.then
            if (typeof then === 'function') { // 是promise
                if (called) return;
                called = true
                then.call(x, y => { // 根据promise的状态决定是成功还是失败
                    // resolve(y) 有可能y返回一个新的promise，需要递归处理
                    resolvePromise(promise2, y, resolve, reject)
                }, (e) => {
                    if (called) return;
                    called = true
                    reject(e)
                })
            } else { // 避免对象中有一个then属性
                resolve(x)
            }
        } catch (error) {
            if (called) return;
            called = true
            reject(error)
        }
    } else {
        resolve(x)
    }
}
class Promise {
    constructor(executor) {
        // 默认是等待状态
        this.status = PENDING
        // 成功的结果
        this.value = undefined
        // 失败的原因
        this.reason = undefined
        this.resolveCallbacksList = [] // 专门用来存储成功的回调
        this.rejectCallbacksList = [] // 专门用来存储失败的回调
        // 立即执行函数的两个参数
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value
                // 状态修改成成功的状态
                this.status = RESOLVED
                this.resolveCallbacksList.forEach(cb => cb())
            }
        }
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason
                // 状态修改成失败态
                this.status = REJECTED
                this.rejectCallbacksList.forEach(cb => cb())
            }
        }
        // 执行器立即执行
        // executor(resolve, reject)

        // 思考： 如果执行器函数执行的时候异常改怎么办 通过try...catch...来捕获
        try {
            executor(resolve, reject)
        } catch (error) { // 错误处理
            reject(error)
        }

    }

    then(onFulfilled, onRejected) {
        // 值的穿透
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
        onRejected = typeof onRejected === 'function' ? onRejected : error => { throw console.error;}
        // 思考：为了实现链式调用，应该怎么处理
        const promise2 = new Promise((resolve, reject) => {
            if (this.status === RESOLVED) {
                // resolve(x)
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            }

            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason)
                        // reject(x)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }

                }, 0);
            }

            if (this.status === PENDING) {
                console.log('等待中')
                this.rejectCallbacksList.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })

                })
                this.resolveCallbacksList.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);
                })
            }
        })
        return promise2
    }
}

// promise 的延迟对象

Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}
module.exports = Promise