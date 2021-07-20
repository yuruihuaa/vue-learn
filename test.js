let prototype = {
    a: 1
}

let data = Object.create(prototype)
data.c = 10

Object.defineProperty(Object.getPrototypeOf(data), 'b', {
    get() {
        console.log(this)
        return 1
    }
})

console.log(Object.getPrototypeOf(data))
console.log(data.b)