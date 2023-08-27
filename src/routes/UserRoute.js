//导入express
const express = require('express');
//创建路由对象
const router = express.Router();
// 引入用户Controller
const UserController = require("../controller/UserController")

// 1、用户登录
router.post('/login', UserController.login);
// 2、查询当前用户路由菜单列表
router.get('/queryMenuList', UserController.queryMenuList);

// 向外导出路由对象
module.exports = router;