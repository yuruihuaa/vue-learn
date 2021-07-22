export  function createRouteMap(routes, oldPathList, oldPathMap, oldNameMap) {
    const pathList = oldPathList || []
    const pathMap = oldPathMap || Object.create(null)
    const nameMap = oldNameMap || Object.create(null)

    routes.forEach(route => {
        addRouteRecord(pathList, pathMap, nameMap, route)
    })

    console.log(pathList, pathMap, nameMap)

    return {
        pathList,
        pathMap,
        nameMap
    }
}

function addRouteRecord(pathList, pathMap, nameMap, route, parent) {
    const { path, name } = route
    const normalizedPath = normalizePath(path, parent)

    const record = {
        path: normalizedPath,
        name,
        components: route.components || { default: route.component },
        meta: route.meta || {},
        parent
    }

    if (route.children) {
        route.children.forEach(child => {
            addRouteRecord(pathList, pathMap, nameMap, child, record)
        })
    }

    if (!pathMap[record.path]) {
        pathList.push(record.path)
        pathMap[record.path] = record
    }

    if (name) {
        if (!nameMap[name]) {
            nameMap[name] = record
        }
    }
}

function normalizePath(path, parent) {
    if (!parent) return path
    return `${parent.path}/${path}`
}