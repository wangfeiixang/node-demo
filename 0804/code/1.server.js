
console.log('hello world')

const http = require("http")

const host = '127.0.0.1'

const port = 1234

const server = http.createServer((req,res)=>{

    res.statusCode=200
    res.setHeader('Content-Type','text/plain')
    res.write('hello world');
    res.end()

})

server.listen(port,()=>{
    console.log(`server is running at http://${host}:${port}`)
})