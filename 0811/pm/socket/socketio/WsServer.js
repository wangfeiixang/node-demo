

let app = require('express')()

const server = require('http').Server(app)

const io = require('socket.io')(server)

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

app.get('/socket.io.js',(req,res)=>{
    res.sendFile(__dirname+'/socket.io.js')
})

let clientMap = {}

let count = 0;


//当客户端连接服务端的时候

io.on("connection",(client)=>{
    client.name = ++count
    client.nickname="新朋友"
    clientMap[client.name]=client

    console.log('有客户端连接了:'+client.name)

   

    client.on("message",(message)=>{
        let info =JSON.parse(message)
        client.nickname = info.nickname
        let type = info.word=='5689'?1:3
        broadcast(info,client,type)
    })

    client.on("error",(err)=>{
        console.log(err)
    })

    client.on("disconnect",(err)=>{
        delete clientMap[client.name]
        console.log(client.name+'下线了')
        broadcast({
            word:'我走了',
            isMe:false,
            nickname:client.nickname
        },client,2)
    })

})

//广播函数
let broadcast = (info,client,type) =>{
    var info = {
        word:info.word,
        isMe:false,
        nickname:info.nickname,
        type:type//1 新用户上线  2 用户离线 3正常对话消息
    }
    for(var key in clientMap){
        if(clientMap[key]==client){
            info.isMe=true
        }else{
            info.isMe=false
        }
        console.log(JSON.stringify(info))
        clientMap[key].send(JSON.stringify(info))
    }
}



server.listen(1234,()=>{
    console.log('server is running....')
})


































