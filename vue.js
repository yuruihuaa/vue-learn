import Observer from "./observer.js"

function Vue(options) {
    let data = options.data ? (typeof options.data === 'function' ? options.data.call(this) : options.data) : {}
    let ob = new Observer(data)
}

export default Vue