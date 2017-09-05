

const fs = require('fs')

let path="./move1.wmv"
let newpath = "./move.wmv"

//读取流
const readstream=fs.createReadStream(path)
//写入流
const writestream=fs.createWriteStream(newpath)

// readstream.on('data',(chunk)=>{
//     writestream.write(chunk)
// })

// readstream.on('end',()=>{
//     console.log('copy is end')
//    fs.unlink(path,(err)=>{
//        console.log('源文件已删除')
//    })
// })

// readstream.on('error',(err)=>{
//     console.log(err)
// })


readstream.pipe(writestream)
