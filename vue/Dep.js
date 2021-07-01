export default class Dep {
    static target
    constructor() {
        this.subs = []  // 保存Watcher
    }

    addSub(sub) {
        this.subs.push(sub)
    }

    removeSub(sub) {
        if (this.subs.length) {
            let index = this.subs.indexOf(sub)
            if (index > -1) {
                this.subs.splice(index, 1)
            }
        }
    }

    depend() {
        if (Dep.target) {
            this.addSub(Dep.target)
        }
    }

    notify() {
        const subs = this.subs.slice()
        for (let i = 0; i < subs.length; i++) {
            subs[i].update()
        }
    }
}

Dep.target = null

export function pushTarget(target) {
    Dep.target = target
}

export function popTarget() {
    Dep.target = null
}