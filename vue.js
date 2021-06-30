import Observer from "./observer.js"
import Watcher from "./watcher.js"

function Vue(options) {
    let data = options.data ?
        (typeof options.data === 'function' ? options.data.call(this) : options.data) : {}

    let ob = new Observer(data)

    const update = () => {
        console.log(data.age)
    }

    new Watcher(this, update)
}


export default Vue