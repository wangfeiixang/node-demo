const response = (res,content)=>{
    res.writeHead(200,{'Content-Type':'text/html'})
    //写入响应信息
    res.write(content)
    //响应结束
    res.end()
}

module.exports=response