

const url = require("url")

let str = '//www.baidu.com:1234/a/b/c/d.html?a=1&b=2&c=3&d=4#main'
//querystring
//第一个参数为要解析的字符串
//第二个参数为 是否解析查询字符串、
//第三个参数为 可以不可以解析不带协议的url地址
let strObj = url.parse(str,true,true)
console.log(strObj)

//作用：在创建服务器的时候，接受到前端请求后，解析请求的信息