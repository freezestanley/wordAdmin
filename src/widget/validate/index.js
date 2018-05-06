let validate = {}
validate.trimStr = function (str) {
  return str ? str.replace(/(^\s*)|(\s*$)/g, "") : ''
}
validate.name = function (str) {
  let trim = this.trimStr(str)
  return trim ? /[0-9A-Za-z]{4,20}$/.test(trim) : false
}
validate.pwd = function (str) {
  let trim = this.trimStr(str)
  return trim ? /[0-9A-Za-z]{6,8}$/.test(trim) : false
}
export default validate