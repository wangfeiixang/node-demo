
const http = require('http')
const fs = require('fs')
http.createServer((req,res)=>{
    if(req.url=='/'){
        fs.readFile('./index.html',(err,data)=>{
            res.writeHead(200,{'Content-Type':'text/html'})
            res.end(data)
        })
    }else{
        res.writeHead(200,{'Content-Type':'text/plain'})
        res.end('not found')
    }
}).listen(1234,()=>{
    console.log('server is running...')
})