

const net = require('net')

const port = 9000

const host = '127.0.0.1'

//客户端创建socket

let client = new  net.Socket()

client.setEncoding = 'UTF-8'

//连接服务器

client.connect(port,host,()=>{
    console.log('我已经连接上服务器了')
})

//当服务端像客户端发送数据的时候会触发
client.on("data",(data)=>{
    console.log(data.toString())
    say()
})

//服务端关闭的时候触发
client.on("close",(err)=>{
    console.log(err)
    console.log('服务器已经关闭了..')
})

const readline = require('readline')

//创建聊天界面
let r = readline.createInterface({
    input:process.stdin,
    out:process.stdout
})

let say = ()=>{
    r.question('请输入:',(inputstr)=>{

        //将用户输入的内容发送给服务端
        client.write(inputstr+'\n')

    })
}