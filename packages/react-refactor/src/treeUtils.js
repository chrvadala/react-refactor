const traverse = require('traverse')

export function getOrThrow(object, path) {
  let wrapped = traverse(object)
  if(wrapped.has(path)) return wrapped.get(path)
  throw new Error(`${path.join(',')} not found`)
}

export function get(object, path, defaultValue = undefined) {
  let wrapped = traverse(object)
  if(wrapped.has(path)) return wrapped.get(path)
  return defaultValue
}
