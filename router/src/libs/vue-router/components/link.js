export default {
    name: 'RouterLink',
    props: {
        to: {
            type: String,
            require: true
        },
        tag: {
            type: String,
            default: 'a'
        }
    },
    render(h) {
        const data = {}
        if (this.tag === 'a') {
            data.attrs = {
                href: '#' + this.to
            }
        }
        return h(this.tag, data, this.$slots.default)
    }
}