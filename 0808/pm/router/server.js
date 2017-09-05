
const http = require('http')

const url = require('url')

const router = require('./router')

const serverhandle = (req,res)=>{
    //资源请求 static  / /index.html     数据请求  api

    let urlInfo = url.parse(req.url,true,true)

    router.ignoreIco(urlInfo.pathname,res)

    //路由的分流
    router.classfify(urlInfo.pathname,res,urlInfo)

}


const server = http.createServer(serverhandle).listen(1234,()=>{
    console.log('server is running...')
})


//数据库。后端，前端   如何操作mysql数据库
//构建了一个简单的电商网站   登陆注册  查询全部商品  加入购物车....


db.user.save({name: 'zhangsan', age: 25})
db.user.insertMany([{name: 'zhangsan1', age: 20, sex:'男'},{name: 'zhangsan2', age: 30}])
db.user.findAndModify({
    query: {age: {$gte: 10}}, 
    sort: {age: -1}, 
    update: {$set: {name: 'a2'}, $inc: {age: 2}},
    remove: false
})

db.runCommand({ findandmodify : "user", 
    query: {age: {$gte: 10}}, 
    sort: {age: -1}, 
    update: {$set: {name: 'a1'}, $inc: {age: 2}},
    remove: false
})

db.user.find({"age": 20})

db.user.find({age: {$gt: 22}})

db.user.find().sort({age: -1})

db.user.update({age:{$gt: 12} }, {$set: {name: '飞',sex:1}}, true, true)