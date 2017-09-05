

const net = require('net')
//创建服务
const server = net.createServer()
//存储当前有哪些客户端在连接
let clientMap = {}

let count = 0

//////////////////////////////////////////
// const net = require('net')

// let count = 0

// let clientMap = {}

// const server = net.createServer()

// server.on('connection',(client)=>{

//     client.name = ++count

//     console.log('新用户来了'+client.name)
    
//     clientMap[client.name] = client

//    // broadcast('我来了',client)
    
//     client.on('data',(data)=>{
//         console.log(client.name+'说:'+data)
//     })
    
//     client.on('error',(err)=>{
//         console.log('client error'+JSON.parse(err))
//         client.end()
//     })
    
//     client.on('close',(err)=>{
//         console.log(err)
//         console.log(client.name+'下线了')

//     })
// })

// server.listen(9000,'127.0.0.1',()=>{
//     console.log('服务器在运行')
// })

 


//当服务被连接的时候就会触发 回调函数接受到的客户端的socket
server.on("connection",(client)=>{
    
    client.name = ++count

    console.log('新用户来了'+client.name)

    clientMap[client.name]=client

    broadcast('我来了',client)

    // 当客户端发送过来数据的时候，会触发
    client.on("data",(data)=>{
        console.log(client.name+'说：'+data)
        broadcast(data,client)
    })

    client.on("error",(err)=>{
        console.log('client error'+JSON.parse(err))
        client.end()
    })
    // 客户端关闭的时候会触发
    client.on("close",(err)=>{
        console.log(cilent.name+'下线了')
        broadcast('我下线了',client)
    })

})


server.listen(9000,'127.0.0.1',()=>{
    console.log('server is running...')
})


let broadcast = (message,client)=>{
    for(var i in clientMap){
        clientMap[i].write(client.name+'说：'+message.toString())
    }
}