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
            Object.defineProperty(obj, keys[i], {
                enumerable: true,
                configurable: true,
                get() {
                    console.log(`Read property: ${keys[i]}`)
                    return value
                },
                set(newVal) {
                    if (newVal === value) return
                    console.log(`Write property: ${keys[i]}`)
                    value = newVal
                }
            })
        }
    }
}

export default Observer