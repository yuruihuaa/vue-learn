import View from './components/view'
import Link from "./components/link";

export default function install(Vue) {
    const isDef = v => v !== undefined
    Vue.mixin({
        beforeCreate() {
            if (isDef(this.$options.router)) {
                this._routerRoot = this
                this._router = this.$options.router
                this._router.init(this)
                Vue.util.defineReactive(this, '_route', this._router.history.current)
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

    Object.defineProperty(Vue.prototype, '$route', {
        get() {
            return this._routerRoot._route
        }
    })

    Vue.component('RouterView', View)
    Vue.component('RouterLink', Link)
}
