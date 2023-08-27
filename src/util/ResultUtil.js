// 返回结果成功
const ok = (res, data) => {
  res.json({ code: 200, message: 'ok', data })
}
// 返回结果失败
const error = (res, message) => {
  res.json({ code: -1, message })
}

// 返回结果失败
/**
 * 自定义异常
 * @param {*} res 
 * @param {*} code 状态码
 * @param {*} message  异常信息
 */
const customError = (res, code, message) => {
  res.json({ code, message })
}

module.exports = {
  ok,
  error,
  customError
}