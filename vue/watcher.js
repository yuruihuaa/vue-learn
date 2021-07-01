import Dep, {popTarget, pushTarget} from "./Dep.js"

export default class Watcher {
    constructor(vm, expOrFn) {
        this.vm = vm
        this.getter = expOrFn
        this.value = this.get()
    }

    get() {
        pushTarget(this)
        let value = this.getter.call(this.vm)
        popTarget()
        return value
    }

    update() {
        this.value = this.getter()
    }

}