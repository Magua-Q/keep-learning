# Promise

### promise 解决了什么问题
+ 多个请求并发，希望达到同步的效果，此时可以使用Promise.all()来实现
+ 链式异步请求的问题，或者说是解决了回调地狱的问题，上一次执行的结果是本次执行的参数，Promise的链式调用可以解决这个问题

### 缺点
+ promise的实现还是基于回调的
+ promise一旦开始不能中断

### 实现
[promise/A+规范](https://promisesaplus.com/)
 
### 关于promise的返回值问题
> promise 无论成功或失败的回调的返回值，可以传递到外层的下一个then(promise链式调用)
+ 如果返回值是普通值（不是错误也不是promise），则传递到下一层的成功的回调中
+ 如果抛出异常或者出错的情况，则传递到下一层失败的回调中
+ 如果返回的是一个Promise的话，会通过promise的状态，决定调用下一个then回调函数
+ 每次执行完promise.then方法后返回的痘哦是一个新的Promise
### 关于promise的错误处理
如果离自己最近的then没有错误处理，会向下(下一个)找reject的回调