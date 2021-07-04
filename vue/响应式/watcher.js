import {popTarget, pushTarget} from "./Dep.js"
const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/
const bailRE = new RegExp(`[^${unicodeRegExp.source}.$_\\d]`)
function parsePath (path) {
    if (bailRE.test(path)) {
        return
    }
    const segments = path.split('.')
    return function (obj) {  // 返回的function根据形如a.b.c的path从Vue实例中获取a.b.c的值并返回，这个返回的函数类似update函数
        for (let i = 0; i < segments.length; i++) {
            if (!obj) return
            obj = obj[segments[i]]
        }
        console.log('This function is be called, return obj: ', obj)
        return obj
    }
}
// 什么情况下会新建Watcher，如模板的{{}}，computed的this.X，watch的key
export default class Watcher {
    constructor(vm, expOrFn) {
        this.vm = vm  // 每个Vue实例对应一个watcher
        if (typeof expOrFn === "function") {
            this.getter = expOrFn
        } else {  // 是形如a.b.c的字符串
            this.getter = parsePath(expOrFn)
        }
        this.value = this.get()
    }

    get() {
        pushTarget(this)
        let value = this.getter.call(this.vm, this.vm)
        popTarget()
        return value
    }

    update() {
        this.value = this.getter.call(this.vm, this.vm)
    }
}