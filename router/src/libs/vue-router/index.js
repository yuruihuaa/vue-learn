import install from "./install";
import {createMatcher} from "./create-matcher";
import {HashHistory} from "./history/hash";

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
                break;
            case 'abstract':
                break;
            default:
                break
        }
    }

    init(app) {
        console.log('init', app)
        this.apps.push(app)
        if (this.app) {
            return
        }
        this.app = app
        const history = this.history

        const setupListeners = () => {

        }

        if (history instanceof HashHistory) {
            history.transitionTo(history.getCurrentLocation(), setupListeners, setupListeners)
        }
    }

    match(raw, current) {
        return this.matcher.match(raw, current)
    }
}

VueRouter.install = install

export default VueRouter