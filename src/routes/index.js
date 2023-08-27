const { contentPath } = require("../config")
// 引入文件路由
const FileRoute = require("./FileRoute")
// 引入用户路由
const UserRoute = require("./UserRoute")

// 注册路由
const registerRoute = function (app) {
  // 注册文件路由
  app.use(`${contentPath}/file`, FileRoute)
  // 组织用户路由
  app.use(`${contentPath}/user`, UserRoute)
}

// 暴露注册路由方法
module.exports = {
  registerRoute
}