import {createRouteMap} from "./create-route-map";
import {createRoute} from "./util/route";

export function createMatcher(routes) {
    const { pathList, pathMap, nameMap } = createRouteMap(routes)

    function match(raw) {
        const location = typeof raw === 'string' ? { path: raw } : raw
        if (raw) {
            for (let i = 0; i < pathList.length; i++) {
                const path = pathList[i]
                const record = pathMap[path]
                if (raw === record.path) {
                    return _createRoute(record, location)
                }
            }
        }

        return _createRoute(null, location)
    }

    function addRoute(route) {
        createRouteMap([route], pathList, pathMap, nameMap)
    }

    function addRoutes(routes) {
        createRouteMap(routes, pathList, pathMap, nameMap)
    }

    function getRoutes() {
        return pathList.map(path => pathMap[path])
    }

    function _createRoute(record, location) {
        return createRoute(record, location)
    }

    return {
        match,
        addRoute,
        addRoutes,
        getRoutes
    }
}