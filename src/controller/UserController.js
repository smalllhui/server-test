const ResultUtil = require("../util/ResultUtil")
const TokenUtil = require("../util/TokenUtil")
const { routerAdminData, routerUserData, routerGuestData } = require("../temp/menu")

const ADMIN_ROLE = 'admin'
const USER_ROLE = 'user'
const GUEST_ROLE = 'guest'

// ! 用户登录
const login = function (req, res) {
  const { userAccount, userPassword, captcha } = req.body
  console.log(`用户登录：userAccount:${userAccount}, userPassword:${userPassword}, captcha:${captcha}`);
  try {
    if (userAccount === "admin" && userPassword === "admin") {
      const token = TokenUtil.generateToken({ role: ADMIN_ROLE })
      const userInfo = {
        userNick: '超级管理员',
        userAvatar:
          'https://p26-passport.byteacctimg.com/img/user-avatar/43876053a00c7c10e3a59026be31dfb5~150x150.jpg',
      }

      ResultUtil.ok(res, { userInfo, token })
    } else if (userAccount === "user" && userPassword === "user") {
      const token = TokenUtil.generateToken({ role: USER_ROLE })
      const userInfo = {
        userNick: '系统用户',
        userAvatar:
          'https://p9-passport.byteacctimg.com/img/user-avatar/e87e68eecb3440185288044d2bf9d9b4~150x150.jpg',
      }
      ResultUtil.ok(res, { userInfo, token })
    } else if (userAccount === "guest" && userPassword === "guest") {
      const token = TokenUtil.generateToken({ role: GUEST_ROLE })
      const userInfo = {
        userNick: '来宾用户',
        userAvatar:
          'https://p3-passport.byteacctimg.com/img/user-avatar/c742fce9bf20c11b212c93324f8f8d55~150x150.jpg',
      }
      ResultUtil.ok(res, { userInfo, token })
    } else {
      ResultUtil.customError(res, 401, '账号或密码错误')
    }
  } catch (error) {
    console.log("用户登录Error:", error);
    ResultUtil.customError(res, 500, '数据库链接异常')
  }
}

// ! 查询用户菜单列表
const queryMenuList = function (req, res) {
  try {
    const token = req.header('Authorization')
    const data = TokenUtil.getDecryptToken(token)
    const { role } = data
    if (role === ADMIN_ROLE) {
      ResultUtil.ok(res, { menuList: routerAdminData })
    } else if (role === USER_ROLE) {
      ResultUtil.ok(res, { menuList: routerUserData })
    } else if (role === GUEST_ROLE) {
      ResultUtil.ok(res, { menuList: routerGuestData })
    } else {
      ResultUtil.error(res, 'token验证失败')
    }
  } catch (error) {
    console.log("查询用户菜单列表Error:", error);
    ResultUtil.customError(res, 403, 'token验证失败')
  }
}

module.exports = {
  login,
  queryMenuList
}

