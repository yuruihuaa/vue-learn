export default {
    name: 'RouterView',
    functional: true,  // 函数式组件，没有this，没有状态
    props: {
        name: {
            type: String,
            default: 'default'
        }
    },
    render(_, { props, children, parent, data }) {
        data.routerView = true

        const h = parent.$createElement
        const name = props.name
        const route = parent.$route
        let depth = 0

        while (parent && parent._routerRoot !== parent) {
            const vnodeData = parent.$vnode ? parent.$vnode.data : {}
            if (vnodeData.routerView) {
                depth++
            }
            parent = parent.$parent
        }

        const matched = route.matched[depth]
        const component = matched && matched.components[name]
        if (!matched || !component) return h()
        return h(component, data, children)
    }
}