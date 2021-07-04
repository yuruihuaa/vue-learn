import { observe } from "./observer.js"
import Watcher from "./watcher.js";

function Vue(options) {
    // 这里的this是new Vue创建的Vue实例
    let data = options.data ?
        (typeof options.data === 'function' ? options.data.call(this) : options.data) : {}
    for (let key in data) {  // 将data中的key代理到Vue实例，通过vm.可以访问data中数据
        Object.defineProperty(this, key, {
            get() {
                return data[key]
            },
            set(newVal) {
                data[key] = newVal
            }
        })
    }
    // 在Observer构造函数中，将data改造成响应式
    observe(data)

    // 在创建Vue实例时，就会收集依赖
    // 因为update函数使用了vm.obj，所以update需要观察vm.obj，当vm.obj被修改是要通知到update
    // 所以会为update函数创建一个Watcher，将update对应的Watcher添加进obj属性的依赖Dep中，
    // 在实际中，update可以是使用vm.obj的模板或组件，每个组件对应一个Watcher?
    const update = () => {
        console.log('Enter update')
        console.log(data.arr) // 同时出发obj的getter和value的getter

        // 每个属性对应一个Dep，每个Observer对应一个Dep
        // 如果调用vm.obj，那么update对应的Watcher会被保存在obj属性对应的Dep，{value: 4}对应的Observer的Dep，一共两份
        // 如果调用vm.obj.value，那么update对应的Watcher会被保存在obj属性对应的Dep，{value: 4}对应的Observer的Dep，value属性对应的Dep,一共三份
    }

    // 为update函数创建一个Watcher实例，创建实例的时候会调用update函数，
    // 触发vm.obj的getter，在getter中将Watcher实例添加进obj的依赖中
    // new Watcher(this, 'obj.value')  // 从这里可以看出模板中使用这种形式，不需要前面加this等前缀，后面查找的时候默认实在data中查找
    new Watcher(this, update)
}

export default Vue