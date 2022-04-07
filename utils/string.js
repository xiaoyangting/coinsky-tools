
export function stringInterception(str, start, end) {
  if (!str) {
    return
  }
  if (str.length < 24) {
    return str
  }
  var subStr = `${str.substring(0, start)}...${str.substring(str.length - end)}`
  return subStr
}