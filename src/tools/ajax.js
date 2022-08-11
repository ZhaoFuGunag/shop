//这个文件是全局的ajax请求封装文件，所有的ajax请求都要放在这个文件中执行
//导入ajax请求插件 axios
import axios from "axios"
//封装一个通用的请求函数
var baseUrl = "/myShop"

function ajax_get(url, params = {}) {
    return new Promise(resolve => {
        axios.get(url, {
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}

function ajax_post(url, params = {}) {
    return new Promise(function (resovle) {
        axios.post(url, params).then(res => {
            resovle(res.data)
        })
    })
}
//定义请求轮播图的函数
var getBanner = () => ajax_get(baseUrl + "/banner")
//定义请求列表的函数
var getGoodList = params => ajax_get(baseUrl + "/goodList", params)
//定义注册请求函数
var getZhuce = params => ajax_get(baseUrl + "/register", params)
//定义登录请求函数
var getLogin = params => ajax_get(baseUrl + "/login", params)
//定义标题请求函数
var getTitle = () => ajax_get(baseUrl + "/getTypeOne")
//定义标题请求函数
var getSearch = params => ajax_get(baseUrl + "/search", params)
// 定义详情页函数
var getDetail = params => ajax_get(baseUrl + "/detail", params)
// 定义同店铺推荐函数
var SameList = params => ajax_get(baseUrl + "/sameList", params)
// 定义购物车函数
var getList = params => ajax_get(baseUrl + "/shopList", params)
// 购物车商品数量增加/添加购物车
var getCartAdd = params => ajax_get(baseUrl + "/add", params)
// 购物车商品删除购物车
var getCartdel = params => ajax_get(baseUrl + "/del", params)
// 购物车商品减少
var getRemove = params => ajax_get(baseUrl + "/remove", params)
//导出封装的函数

//module.exports={}  requer()    node导入导出

//ES6模块化导出
// export default {} import obj from "ajax.js"

export {
    getBanner,
    getGoodList,
    getLogin,
    getZhuce,
    getTitle,
    getSearch,
    getDetail,
    SameList,
    getCartAdd,
    getList,
    getCartdel,
    getRemove
}
//import{ } from "ajax.js" 导出时不加default,导入就可以使用按需结构导入