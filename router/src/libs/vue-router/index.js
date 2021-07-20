import install from "./install";

class VueRouter {
    constructor() {
    }

    init() {
        console.log('init')
    }
}

VueRouter.install = install

export default VueRouter