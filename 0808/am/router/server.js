
const http = require('http')

const url = require('url')

const router = require('./router')

const serverhandle = (req,res)=>{
    //资源请求 static  / /index.html     数据请求  api

    let urlInfo = url.parse(req.url,true,true)

    router.ignoreIco(urlInfo.pathname,res)

    //路由的分流
    router.classfify(urlInfo.pathname,res)

}


const server = http.createServer(serverhandle).listen(1234,()=>{
    console.log('server is running...')
})