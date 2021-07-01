class Test{
    constructor(value) {
        this.value = value
        value.a = 10
    }
}

let obj = {
    b: 2
}
let test = new Test(obj)

console.log(obj)