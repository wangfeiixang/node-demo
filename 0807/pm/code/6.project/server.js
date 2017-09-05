

const http = require('http')
const url = require('url')
const port = 1234
const host = '127.0.0.1'

const router = require('./router')

const server = http.createServer((req,res)=>{
    //解析请求信息
    let urlInfo = url.parse(req.url,true,true)  
    //屏蔽favicon.ico
    if(urlInfo.pathname=='/favicon.ico'){
        res.end()
    }

    // 1.资源请求  / || /index.html     js/css/image         
    //2. 数据请求 ajax
    //把请求信息交于路由处理
    router.handle(urlInfo.pathname,res)

}).listen(port,host,()=>{
    console.log(`server is running at http://${host}:${port}/`)
})

////////////////////////////

// const server = http.createServer((req,res)=>{
//     let urlInfo = url.parse(req.url,true,true)
//     if ( urlInfo.pathname=='./favicon.ico' ) {
//         res.end()
//     } 

//     router.handle(urlInfo.pathname,res)
    
// }).listen(port,host,()=>{
//     console.log('server is running')
// })


















//1.判断请求  2.根据请求做出不同的响应    

//1.页面搭建 2.数据交互 3.dom更新