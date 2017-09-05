
//准备利用http模块的request方法发送一个get请求

const https = require('https')

let options = {
    hostname:"api.douban.com",
    port:443,
    path:'/v2/movie/coming_soon',
    method:'GET'
}



//返回一个请求对象

const req = https.request(options,(res)=>{
    // console.log(`状态码：${res.statusCode}`)
    // console.log(`响应头：${JSON.stringify(res.headers)}`)
    let result = ''
    res.on("data",(chunk)=>{
        result += chunk
    })
    res.on('end',()=>{
        console.log(result)
    })

})

req.on("error",(err)=>{
    console.log(err)
})


//需要在请求结束之后执行end方法
req.end()