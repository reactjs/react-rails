export function replaceNullWithUndefined(obj) {
  Object.entries(obj).forEach((entry) => {
    const key = entry[0]
    const value = entry[1]
    if(!!value && typeof value === 'object') {
      return replaceNullWithUndefined(value)
    }
    if (value === null) {
      obj[key] = undefined
    }
  })
  return obj
}
