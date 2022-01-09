// 函数柯里化 函数反柯里化
const currying = (fn, arr = []) => {
    let len = fn.length
    return function (...args) {
        arr = [...arr, ...args]
        if (len > arr.length) {
            return currying(fn, arr)
        } else {
            return fn(...arr)
        }
    }
}

// testing


// 判断变量的类型
/**
 * 1. typeof
 * 缺点：
 * 不能判断对象类型 typeof [] typeof {}
 * 2. constructor 变量是通过谁来构造出来的
 * 3. instanceof  判断变量是谁的实例
 * 4. Object.prototype.toString.call()
 * 
 * 
*/