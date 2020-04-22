/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}
/**
 * 验证密码
 * 8-18位不含特殊字符的数字、字母组合
 * @param {*} s
 */
export function isPwd (s) {
  return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/.test(s)
}

/**
 * 验证用户名
 * 4-16位不含特殊字符的数字、字母组合
 * @param {*} s
 */
export function isAccount (s) {
  return /^[0-9A-Za-z]{4,16}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 验证正整数
 * @param {*} s
 */
export function isNumber (s) {
  return /^\+?[1-9][0-9]*$/.test(s)
}

/**
 * 验证身份证号
 * @param {*} s
 */
export function isIdCard (s) {
  return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(s)
}
