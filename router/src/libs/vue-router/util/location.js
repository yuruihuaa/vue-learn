export function normalizeLocation(raw) {
    let next = typeof raw === 'string' ? { path: raw } : raw
    return next
}