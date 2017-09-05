
const http =  require('http');

const host = '127.0.0.1';

const port = 9988;


const server = http.createServer((req,res)=>{

    /*res.statusCode = 200;
    res.setHeader('Content-Type','text/plain')
    res.write('你好')
    res.end()*/
    //console.log(req.url)
    console.log(req.headers)
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    res.write('你好')
    res.end()

})

const server = http.createServer((req,res)=>{

    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain')
    res.write('hhh')
    res.end()

})

server.listen(port,()=>{
    console.log('正在运行中')
})

server.listen(port,()=>{
    console.log(`server is running at http://${host}:${port}`)
})