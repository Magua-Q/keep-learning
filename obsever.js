// 观察者模式
class Obsever { // 观察者
    constructor(name){
        this.name = name
    }
    update(newStatus) {
        console.log(newStatus)
    }
}

class Subject {
    constructor (name, status) {
        this.name = name
        this.status = status
        this.deps = []
    }
    attach (obsever) {
        this.deps.push(obsever)
    }
    setState (newStatus) {
        this.status = newStatus
        this.deps.forEach(item => item.update(this.status))
    }
}

const sub = new Subject('Tom', 'happy')
const jim = new Obsever("jim")
const bob = new Obsever("bob")
sub.attach(jim)
sub.attach(bob)
sub.setState('unhappy')

