import {createRoute} from "../util/route";

const START = createRoute(null, {
    path: '/'
})

export class History {
    constructor(router, base) {
        this.router = router
        this.base = base

        this.current = START
    }

    transitionTo(location, onComplete) {
        let route = this.router.match(location, this.current)
        this.updateRoute(route)
        if (onComplete) {
            onComplete()
        }
    }

    listen(cb) {
        this.cb = cb
    }

    updateRoute(route) {
        this.current = route
        this.cb && this.cb(route)
    }
}