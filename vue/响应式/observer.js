import Dep from "./Dep.js"

const arrayProto = Array.prototype  // 数组对象的原型对象
const arrayMethods = Object.create(arrayProto)  // 以arrayProto数组的原型对象为原型创建一个新对象
const methodsToPatch = [
    // 数组转成响应式时需要新写的数组方法，因为这些同名数组方法会改变数组
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]
methodsToPatch.forEach(method => {
    const original = arrayProto[method]  // 从数组的原型中获取数组的原始方法
    Object.defineProperty(arrayMethods, method, {
        writable: true,
        enumerable: false,
        configurable: true,
        value: function (...args) {
            const result = original.apply(this, args)  // 这个this是调用了该方法的对象，是data对象
            const ob = this.__ob__
            let inserted
            switch (method) {
                case 'push':
                case 'unshift':  // push和unshift是插入操作
                    inserted = args
                    break
                case 'splice': // splice方法的第二个参数以后的参数表示插入操作
                    inserted = args.slice(2)
                    break
            }
            if (inserted) {
                ob.observeArray(inserted) // 将新插入的数据转成响应式的
            }
            console.log('Array data changed, notify')
            ob.dep.notify() // 可以理解为插入是为根级数据添加属性，改变的是根级数据，所以需要使用Observer的Dep
            return result
        }
    })
})


class Observer {
    constructor(value) {
        this.value = value // value是需要转为响应式的目标对象target
        this.dep = new Dep()  // 当调用Vue.set或Vue.delete新增或删除属性时，当数组插入或删除数据时，使用这个Dep通知这个属性所在的对象或数组
        // 为value定义一个属性__ob__，标志已经被转成响应式，值是value对应的Observer实例
        Object.defineProperty(value, '__ob__', {  // 为Object和Array类型的value都添加__ob__属性
            value: this,
            writable: true,
            configurable: true,
            enumerable: false
        })
        if (Array.isArray(value)) {   // value是数组
            if ('__proto__' in {}) {   // 一般运行环境是浏览器时，Object上会有一个__proto__属性表示对象的原型对象
                value.__proto__ = arrayMethods  // 原先value.__proto__是Array.prototype，但是现在被修改成arrayMethods，一个以Array.prototype为原型的对象
            } else {
                // 否则因为没有__proto__属性，将arrayMethods的可枚举自有属性和属性值通过Object.defineProperty添加到value自身上
            }
            this.observeArray(value)
        } else {              // value是普通对象
            this.walk(value)
        }
    }

    walk(obj) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i])
        }
    }

    observeArray(items) {
        // 遍历数组的每个元素，将其转成响应式的
        for (let i = 0, l = items.length; i < l; i++) {
            observe(items[i])
        }
    }
}
export function observe(value) {
    if (value === null || typeof value !== "object") return
    if (value.__ob__) {
        return
    } else {
        return new Observer(value)
    }
}

// 在对象obj上定义一个响应式属性
function defineReactive(obj, key) {
    const dep = new Dep()  // 为obj的每一个属性创建一个Dep
    let val = obj[key]
    let childOb
    if (val && typeof val === 'object') {  // 当key的属性值也是对象时，将key的属性值也转成响应式
        childOb = observe(val)
    }

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            let value = val
            if (Dep.target) { // 将同一个Dep.target也就是update的Watcher，加入属性对应的Dep和childOb的Dep，如果childOb有值
                dep.depend()
                if (childOb) {
                    childOb.dep.depend()
                }
            }
            console.log(`Get property: ${key}: ${val}`)
            return value
        },
        set(newVal) {
            if (newVal === val) return
            console.log(`Set property: ${key}: ${newVal}`)
            val = newVal
            if (newVal && typeof newVal === 'object') {  //当设置的新值时对象时，将newVal也转变成响应式，赋值给childOb
                childOb = new Observer(val)
            }
            dep.notify()
        }
    })
}

export default Observer