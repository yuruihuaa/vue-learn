import install from "./install";
import {createMatcher} from "./create-matcher";
import {HashHistory} from "./history/hash";
import {HTML5History} from "./history/html5";

const inBrowser = typeof window !== undefined

class VueRouter {
    constructor(options) {
        this.app = null
        this.apps = []
        this.options = options
        this.matcher = createMatcher(options.routes)

        let mode = options && options.mode || 'hash'
        if (!inBrowser) {
            this.mode = 'abstract'
        }

        this.mode = mode

        switch (this.mode) {
            case 'hash':
                this.history = new HashHistory(this, options.base)
                break;
            case 'history':
                this.history = new HTML5History()
                break;
            case 'abstract':
                break;
            default:
                break
        }
    }

    init(app) {
        this.apps.push(app)
        if (this.app) {
            return
        }
        this.app = app
        const history = this.history

        const setupListeners = () => {
            this.history.setupListeners()
        }

        if (history instanceof HashHistory) {
            history.listen((route) => {
                this.apps.forEach(app => {
                    app._route = route   // _route是响应式的，被修改会notify依赖
                })
            })
            history.transitionTo(history.getCurrentLocation(), setupListeners)
        }
    }

    match(raw, current) {
        return this.matcher.match(raw, current)
    }

    resolve(to, current) {
        current = current || this.history.current
        const location = { path: to }
        const route = this.match(location, current)
        const href = this.mode === 'hash' ? '#' + to : to
        return {
            location,
            route,
            href
        }
    }
}

VueRouter.install = install

export default VueRouter