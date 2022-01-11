/**
 * 1. promise 有三个状态：
 * 成功态
 * 失败态
 * 等待中
 * 
 * 2. promise 默认执行器会立即执行 executor()
 * 3. 成功的原因和失败的原因
 * */
// 1. 三种状态
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
const PENDING = 'PENDING'
class Promise {
    constructor(executor) {
        // 默认是等待状态
        this.status = PENDING
        // 成功的结果
        this.value = undefined
        // 失败的原因
        this.reason = undefined
        // 立即执行函数的两个参数
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value
                // 状态修改成成功的状态
                this.status = RESOLVED
            }
        }
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason
                // 状态修改成失败态
                this.status = REJECTED
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
        if (this.status === RESOLVED) {
            onFulfilled(this.value)
        }

        if (this.status === REJECTED) {
            onRejected(this.reason)
        }
    }
}

module.exports = Promise