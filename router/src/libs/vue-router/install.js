import View from './components/view'

export default function install(Vue) {
    const isDef = v => v !== undefined
    Vue.mixin({
        beforeCreate() {
            if (isDef(this.$options.router)) {
                this._routerRoot = this
                this._router = this.$options.router
                this._router.init(this)
            } else {
                this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
            }
        }
    })

    Object.defineProperty(Vue.prototype, '$router', {
        get() {
            return this._routerRoot._router
        }
    })

    Vue.component('RouterView', View)
}
