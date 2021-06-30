import Dep from "./Dep.js"

class Observer {
    constructor(value) {
        if (Array.isArray(value)) {
            // Value is an array
        } else {
           this.walk(value)
        }
    }

    walk(obj) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            let value = obj[keys[i]]
            const dep = new Dep()

            Object.defineProperty(obj, keys[i], {
                enumerable: true,
                configurable: true,
                get() {
                    if (Dep.target) {
                        dep.depend()  // 为这个属性收集依赖
                    }
                    console.log(`读取属性: ${keys[i]}: ${value}`)
                    return value
                },
                set(newVal) {
                    if (newVal === value) return
                    console.log(`修改属性: ${keys[i]}: ${newVal}`)
                    dep.notify()
                    value = newVal
                }
            })
        }
    }
}

export default Observer