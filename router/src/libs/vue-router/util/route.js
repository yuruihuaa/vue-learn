export function createRoute(record, location) {
    const route = {
        name: location.name || (record && record.name),
        meta: (record && record.meta) || {},
        path: location.path || '/',
        hash: location.hash || '',
        matched: record ? formatMath(record) : []  // matched比较重要
    }

    return Object.freeze(route)
}

function formatMath(record) {
    let res = []
    while (record) {
        res.unshift(record)
        record = record.parent
    }
    return res
}