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

    transitionTo(location, onComplete, onAbort) {
        let route = this.router.match(location, this.current)
        console.log(route, onComplete, onAbort)
    }
}