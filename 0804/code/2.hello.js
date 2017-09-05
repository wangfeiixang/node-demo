
//请求http模块  准备去创建服务   
const http = require('http')
//域名
const host = '127.0.0.1'
//端口
const port = 1234

//创建了一个服务        雇佣一个服务员
//传入的函数会在每一次接受到请求的时候触发      岗前培训
//@params req 请求信息 请求头 请求的地址等等
//@params res 相应对象 可以做出响应的对象
const server = http.createServer((req,res)=>{
    // console.log(req.url)//得到客户端请求的地址
    // console.log(req.headers)
    //设置响应头，包括状态码，响应信息类型

    res.writeHead(200,{'Content-Type':'text/html'})
    //写入响应信息
    res.write('hello world!\n')
    res.write('hello nodejs!')
    //响应结束
    res.end()
    // response('hello world')
})
//上岗
server.listen(port,host,()=>{
    console.log('server is running')
})



// const response = (res,content)=>{
//     res.writeHead(200,{'Content-Type':'text/html'})
//     //写入响应信息
//     res.write(content)
//     //响应结束
//     res.end()
// }