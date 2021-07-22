export default {
    name: 'RouterView',
    functional: true,
    render(_, { props, children, parent, data }) {
        console.log('RouterView render ', props, children, parent, data)
    }
}