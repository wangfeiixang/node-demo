
// /引入node内置模块或者npm下载下来的，在node_modules文件夹里的模块的时候，直接写名字
//自定义模块需要写路径    ./
const http  = require("http")
const res = require("./modules/res")

console.log(res)