import {History} from "./base";

export class HashHistory extends History {
    constructor(router, base) {
        super(router, base);

        ensureSlash()
    }

    setupListeners() {
        window.addEventListener('hashchange', () => {
            this.transitionTo(getHash(), null, null)
        })
    }

    getCurrentLocation() {
        return getHash()
    }
}

function getHash() {
    let href = window.location.href
    const index = href.indexOf('#')
    if (index < 0) return ''

    href = href.slice(index + 1)

    return href
}

function replaceHash(path) {
    window.location.hash = path
}

function ensureSlash() {
    const path = getHash()
    if (path.charAt(0) === '/') {
        return true
    }
    replaceHash('/' + path)
    return false
}